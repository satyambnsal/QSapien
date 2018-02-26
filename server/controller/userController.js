import User from '../models/User';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import logger from 'winston';
import jwt from 'jsonwebtoken';

let jwtsecret = process.env.JWT_SECRET||'qsapiensecret';
logger.level = 'debug';


exports.user_signup_post = [
    body('first_name', 'Username is required').isLength({ min: 1 }).trim(),
    body('email_id', 'Invalid Email Address').isEmail().trim().normalizeEmail(),
    body('password', 'Password must be at least 6 characters long and must contain numeric digit').isLength({ min: 6 }).matches(/\d/),
    (req, res, next) => {
        logger.info('user signup post method entry point');
        logger.debug("user signup request body::" + JSON.stringify(req.body));
        let signupData = {};
        for (let prop in req.body) {
            if (req.body[prop] != '')
                signupData[prop] = req.body[prop];
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
            return res.json({statusCode:500,message:'error occured'});
        }
        else {
            User.findOne({ email_id: req.body.email_id}, (err, result) => {
                if (err) {
                    logger.debug("finding record in admin database error::" + JSON.stringify(err));
                    return next(err);
                }
                else if (result) {
                    logger.info("email id already in use");
                    return res.json({statusCode:400,message:'email id already exists'});
                }
                else {
                    user.save((err, result) => {
                        if (err) {
                            return next(err);
                        }
                        let token = jwt.sign({ id: result._id }, jwtsecret, { expiresIn: 86400 });
                        req.session.locallibrarytoken = token;
                        res.render({statusCode:200,message:'user completed signup successfully',token:token});
                    });
                }
            });
        }

    }
]


// exports.user_login_post = [
//     body('password', 'Invalid Password').isLength({ min: 6 }).matches(/\d/),
//     (req, res, next) => {
//         logger.info('login admin post method entry point');
//         if (req.session.locallibrarytoken) {
//             jwt.verify(req.session.locallibrarytoken, jwtsecret, (err, decoded) => {
//                 if (err) {
//                     logger.debug("error occured while verifying token::" + JSON.stringify(err));
//                     return next(err);
//                 }
//                 logger.info("jwt token verified successfully");
//                 return res.redirect('/catalog/books');
//             })
//         }
//         let errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             let errorMsgs = [];
//             let tempErr = errors.mapped();
//             logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
//             for (let prop in tempErr)
//                 errorMsgs.push(tempErr[prop].msg);
//             res.render('loginAdmin', { errors: errorMsgs });
//             return;
//         }
//         else {
//             Admin.findOne({ email: req.body.email }, (err, result) => {
//                 if (err) {
//                     next(err);
//                 }
//                 else if (!result) {
//                     res.render('loginAdmin', { errors: ["Email Id is not registered"] });
//                 }
//                 else if (result.password !== req.body.password) {
//                     res.render('loginAdmin', { errors: ["Password doesn't match with given email address"] });
//                 }
//                 else {
//                     logger.info('in login method::user verified successfully:: sending jwt token in request');
//                     let token = jwt.sign({ id: result._id }, jwtsecret, { expiresIn: 86400 });
//                     req.session.locallibrarytoken = token;
//                     return res.redirect('/catalog/books');
//                 }
//             })
//         }
//     }
// ]
// exports.logout_admin=(req,res)=>{
//     logger.info('admin logout method entry');
//    // logger.info('req session object::'+JSON.stringify(req.session));
//     req.session.destroy(err=>{
//         if(err){
//             logger.info('error::'+err.toString());
//         }
//         else{
//             logger.info('session destroyed successfully');
//         }
//         });
// }