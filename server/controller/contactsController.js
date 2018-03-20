import User from '../models/User';
import FriendList from '../models/FriendList';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import logger from 'winston';

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
            User.find({}, (err, results) => {
                if (err) {
                    logger.info('error occured while fetching public contact records')
                    logger.debug('occured error::' + err.message);
                    return res.status(500).json({ message: 'error occured while performing database operation' });
                }
                else {
                    logger.info('public contact records fetched successfully');
                    logger.debug('===records===' + JSON.stringify(results));
                    let filter_results = results.filter(result => result._id != userId);
                    filter_results = filter_results.map(result =>{
                        let name = result.last_name ? (result.first_name + ' ' + result.last_name) : result.first_name;
                         name = name.trim();
                        return {_id: result._id,
                            credit_points:result.credit_points,
                            profile_image_url:result.profile_image_url,name
                        }
                    });
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
                return FriendList.findOneAndUpdate({ userId: userId }, result, { upsert: true })
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

async function getUserDetailFromId(contactList) {
    let result = [];
    for (let contactId of contactList) {
        let res = await User.findOne({ _id: contactId }, 'first_name last_name');
        res = { userId: res._id, name: res.first_name + ' ' + res.last_name }
        result.push(res);
    }
    return result;

}
exports.friend_list_get = [
    body('userId', 'User id is required to get list of friends'),
    (req, res, next) => {
        logger.info('friend list get method entry point');
        logger.debug('--------------user id----------' + req.body.userId);
        const userId = req.body.userId;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsgs = [];
            let tempErr = errors.mapped();
            logger.debug("express validator validation error:: " + JSON.stringify(tempErr));
            for (let prop in tempErr)
                errorMsgs.push(tempErr[prop].msg);
            return res.status(400).json({ message: 'error occured', errorMsgs });
        }
        else {
            FriendList.findOne({ userId }).then(result => {
                logger.debug('-------------friendList find one result--------' + JSON.stringify(result));
                if (!result)
                    return res.status(200).json([]);
                return getUserDetailFromId(result.friendList);
            }).then(result => {
                logger.info('-----final result---------' + JSON.stringify(result));
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json({ message: error.message });
            })
        }
    }
]