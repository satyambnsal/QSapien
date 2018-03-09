import User from '../models/User';
import FriendList from '../models/FriendList';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import logger from 'winston';
import jwt from 'jsonwebtoken';
import multer from 'multer';
const ObjectId=require('mongoose').Types.ObjectId;
let jwtsecret = process.env.JWT_SECRET || 'qsapiensecret';
logger.level = 'debug';


const storage=multer.diskStorage({
    destination:'./public/files',
    filename(req,file,cb){
        cb(null,`${file.originalname}`);
    }
});
const upload=multer({storage});
exports.user_signup_post = [
    body('signup_fields', 'Signup field body is required').exists(),
    body('signup_fields.first_name', 'Username is required').isLength({ min: 1 }).trim(),
    body('signup_fields.email_id', 'Invalid Email Address').isEmail().trim().normalizeEmail(),
    body('signup_fields.password', 'Password must be at least 6 characters long and must contain numeric digit').isLength({ min: 6 }).matches(/\d/),
    (req, res, next) => {
        logger.info('user signup post method entry point');
        logger.debug("user signup request body::" + JSON.stringify(req.body));
        let signupData = {};
        for (let prop in req.body.signup_fields) {
            if (req.body.signup_fields[prop] != '' && prop != 'confirm_password')
                signupData[prop] = req.body.signup_fields[prop];
        }
        let user = new User(signupData);

        logger.debug("user signup data:: " + JSON.stringify(signupData));
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            return res.status(400).json({ message: 'error occured' });
        }
        else {
            User.findOne({ email_id: req.body.signup_fields.email_id }, (err, result) => {
                if (err) {
                    logger.debug("finding record in user database error::" + JSON.stringify(err));
                    return next(err);
                }
                else if (result) {
                    logger.info("email id already in use");
                    return res.status(400).json({ message: 'email id already exists' });
                }
                else {
                    user.save((err, result) => {
                        if (err) {
                            logger.info('error occured while saving user record');
                            logger.debug("error::" + err.message);
                            return next(err);
                        }
                        let token = jwt.sign({ id: result._id }, jwtsecret, { expiresIn: 86400 });
                        req.session.locallibrarytoken = token;
                        res.status(200).json({ message: 'user completed signup successfully', token: token });
                    });
                }
            });
        }

    }
]


exports.user_login_post = [
    body('email_id', 'Email Id is required').isEmail(),
    body('password', 'Invalid Password').isLength({ min: 6 }).matches(/\d/),
    (req, res, next) => {
        logger.info('login admin post method entry point');
        logger.debug('-------login method body----------' + JSON.stringify(req.body));
        if (req.session.token) {
            jwt.verify(req.session.locallibrarytoken, jwtsecret, (err, decoded) => {
                if (err) {
                    logger.debug("error occured while verifying token::" + JSON.stringify(err));
                    return next(err);
                }
                logger.info("jwt token verified successfully");
                return res.status(200).json({ message: 'user verified successfully' });
            })
        }
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            return res.status(400).json({ message: 'error occured while verifying user' });
        }
        else {
            User.findOne({ email_id: req.body.email_id }, (err, result) => {
                logger.info('inside find user');
                logger.debug('login method find method result::' + JSON.stringify(result));
                if (err) {
                    next(err);
                }
                else if (!result) {
                    logger.info('error occured email id not registered');
                    res.status(400).json({ message: 'email id is not registered' });
                }
                else if (result.password !== req.body.password) {
                    logger.info('error occured password does not match');
                    res.status(400).json({ message: 'Password does not match with given email address' });
                }
                else {
                    logger.info('in login method::user verified successfully:: sending jwt token in request');
                    let token = jwt.sign({ id: result._id }, jwtsecret, { expiresIn: 86400 });
                    req.session.locallibrarytoken = token;
                    return res.status(200).json({ token: { userId: result._id, token }, message: 'user verified successfully' });
                }
            })
        }
    }
]
exports.public_contacts_post = [
    body("userId", 'user id must be provided while fetching public contact list').exists(),
    (req, res, next) => {
        logger.info('public contacts post method entry point');
        logger.debug("public contacts post method request body::" + JSON.stringify(req.body));
        const userId = req.body.userId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            return res.status(400).json({ message: 'error occured' });
        }
        else {
            User.find({}, 'first_name last_name', (err, results) => {
                if (err) {
                    logger.info('error occured while fetching public contact records')
                    logger.debug('occured error::' + err.message);
                    return res.status(500).json({ message: 'error occured while performing database operation' });
                }
                else {
                    logger.info('public contact records fetched successfully');
                    logger.debug('===records===' + JSON.stringify(results));
                    let filter_results = results.filter(result => result._id != userId);
                    filter_results = filter_results.map(result => ({ name: result.first_name + ' ' + result.last_name, _id: result._id }));
                    logger.debug('=====filter results=====' + JSON.stringify(filter_results));
                    res.status(200).json(filter_results);
                }
            })
        }

    }
]
exports.add_to_friend_list = [
    body('userId', 'userId is required to perform this operation'),
    body('friendId', 'friendId is required to perform this operation'),
    (req, res, next) => {
        logger.info('add to friend list method entry point');
        const userId = req.body.userId;
        const friendId = req.body.friendId;
        logger.info('-------------user Id-----------' + userId);
        logger.info('------------friend Id-----------' + friendId);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            return res.status(400).json({ message: 'error occured' });
        }
        else {
            FriendList.findOne({ userId }).then(result => {
                if (!result) {
                    return {
                        userId, friendList: [friendId]
                    }
                }
                if (result.friendList.indexOf(friendId) == -1) {
                    result.friendList.push(friendId);
                }
                return result;
            }).then(result => {
                console.log("========182=========");
                console.log(JSON.stringify(result));
                return FriendList.findOneAndUpdate({userId:userId},result,{upsert:true})
            }).then(result => {
                console.log("=========resp2======");
                console.log(JSON.stringify(result));
                res.status(200).json({ message: 'user successfully added to your friend list' });
            }).catch(err => {
                logger.info('error occured while updating user contact list');
                logger.debug('====error======' + JSON.stringify(err));
                res.status(500).json({ message: err.message });
            })
        }

    }
]
async function getUserDetailFromId(contactList){
    let result=[];
        for(let contactId of contactList){
            let res= await User.findOne({_id:contactId},'first_name last_name');
            res={userId:res._id,name:res.first_name+' '+res.last_name}
            result.push(res);        
        }
    return result;

}
exports.friend_list_get = [
    body('userId', 'User id is required to get list of friends'),
    (req, res, next) => {
        logger.info('friend list get method entry point');
        logger.debug('--------------user id----------'+req.body.userId);
        const userId = req.body.userId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            return res.status(400).json({ message: 'error occured',errorMsgs});
        }
        else {
        FriendList.findOne({userId}).then(result=>{
            logger.debug('-------------friendList find one result--------'+JSON.stringify(result));
            if(!result)
            return res.status(200).json([]);
            return getUserDetailFromId(result.friendList);
        }).then(result=>{
            logger.info('-----final result---------'+JSON.stringify(result));
            res.status(200).json(result);
        }).catch(error=>{
            res.status(500).json({message:error.message});
        })
        }
    }
]
exports.user_file_upload=[upload.single('file'),(req,res)=>{
    console.log('----file----'+req.file);
    console.log('req body user file upload',JSON.stringify(req.body));
    res.send('success');
    res.end();
    }]