import Challenge from '../models/Challenge';
import User from '../models/User';
import logger from 'winston';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import mongoose from 'mongoose';

exports.get_challenges_post = [
    body('userId', 'user id is required').exists(),
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info('validation error occured it get challenges method');
            res.status(500).json({ message: 'error occured while fetching challenges' });
        }
        else {
            let userId = req.body.userId;
            try {
                let challenges = await Challenge.find({ opponentId: userId, active: true });
                logger.info('challenges fetched successfully');
                logger.debug(JSON.stringify(challenges));
                challenges = challenges.map(challenge => {
                    let { question, choiceA, choiceB, choiceC, choiceD, creditPoints, hint, referenceLinks, opponentName, senderName } = challenge;
                    let challengeId = challenge._id;
                    let challengeData = { question, choiceA, choiceB, choiceC, choiceD, creditPoints, hint, referenceLinks, opponentName, senderName, challengeId };
                    return challengeData;
                }
                )
                res.status(200).json(challenges);
            }
            catch (error) {
                logger.info('validation error occured it get challenges method');
                res.status(500).json({ message: 'error occured while fetching challenges' });
            }
        }
    }
]

exports.solve_challenge_post = [
    body('selectedChoice', 'answer field is required to solve challenge').exists(),
    body('challengeId', 'challenge id is required to solve challenge').exists(),
    async (req, res) => {
        logger.info('challenge solve method entry point');
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.debug('validation error occured::' + JSON.stringify(errors));
            res.status(500).json({ isCheckSuccess: false, message: 'error occured while solving challenge' });
        }
        else {
            const { selectedChoice, challengeId } = req.body;
            try {
                const challenge = await Challenge.findById(challengeId);
                logger.info('challenge details::' + JSON.stringify(challenge));
                if (challenge) {
                    if (challenge.answer.toLowerCase() === selectedChoice.toLowerCase()) {
                        logger.info('congrats! you have made the right choice');
                        User.findOneAndUpdate({ _id: challenge.opponentId }, { $inc: { credit_points: challenge.creditPoints } }, (err, data) => {
                            if (err) {
                                logger.info('error occured while updating credit points of user');
                                res.status(500).json({ isCheckSuccess: false, message: 'internal error occured while validating answer' });
                            }
                            else {
                                Challenge.findOneAndUpdate({ _id: challengeId }, {
                                    $set: {
                                        active: false, isAnswered: true,
                                        isAnsweredCorrect: true, opponentSelectedAnswer: selectedChoice
                                    }
                                }, (err, data) => {
                                    if (err) {
                                        logger.info('error occured while updating credit points of user');
                                        res.status(500).json({ isCheckSuccess: false, message: 'internal error occured while validating answer' });
                                    }
                                    else {
                                        logger.info('user credit points updated success fully');
                                        res.status(200).json({ isCheckSuccess: true, isChoiceCorrect: true, message: 'congrats! you have made the right choice.you have earned '+challenge.creditPoints+' credit points' });
                                    }
                                })
                            }
                        })
                    }
                    else {
                        User.findOneAndUpdate({ _id: challenge.opponentId }, { $inc: { credit_points: -1 } }, (err, data) => {
                            if (err) {
                                logger.info('error occured while updating credit points of user');
                                res.status(500).json({ isCheckSuccess: false, message: 'internal error occured while validating answer' });
                            }
                            else {
                                Challenge.findOneAndUpdate({ _id: challengeId }, {
                                    $set: {
                                        active: false, isAnswered: true,
                                        isAnsweredCorrect:false, opponentSelectedAnswer: selectedChoice.trim()
                                    }
                                }, (err, data) => {
                                    if (err) {
                                        logger.info('error occured while updating credit points of user');
                                        res.status(500).json({ isCheckSuccess: false, message: 'internal error occured while validating answer' });
                                    }
                                    else {
                                        logger.info('user credit points updated success fully');
                                        res.status(200).json({ isCheckSuccess: true, isChoiceCorrect:false, message: 'Oops you have made the wrong choice,you loose 1 credit point' });
                                    }
                                })
                            }
                        })
                    }
                }
                else {
                    res.status(404).json({ isCheckSuccess: false, message: 'challenge with specified challenge Id not found' });
                }
            }
            catch (error) {
                logger.info('error occured while solving challenge');
                logger.debug('error details::' + JSON.stringify(error));
                res.status(500).json({ isCheckSuccess: false, message: 'error occured while solving challenge.maybe you had provided wrong challenge ID' });
            }
        }
    }
]
exports.get_asked_challenges = [
    body('userId', 'user id is required').exists(),
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info('validation error occured it get challenges method');
            res.status(500).json({ message: 'error occured while fetching challenges' });
        }
        else {
            let userId = req.body.userId;
            try {
                let challenges = await Challenge.find({ senderId: userId });
                logger.info('challenges fetched successfully');
                logger.debug(JSON.stringify(challenges));
                challenges = challenges.map(challenge => {
                    let { question, choiceA, choiceB, choiceC, choiceD, creditPoints, hint, referenceLinks, opponentName, answer } = challenge;
                    let challengeId = challenge._id;
                    let challengeData = { question, choiceA, choiceB, choiceC, choiceD, creditPoints, hint, referenceLinks, opponentName, answer, challengeId };
                    return challengeData;
                }
                )
                res.status(200).json(challenges);
            }
            catch (error) {
                logger.info('validation error occured it get asked challenges method');
                res.status(500).json({ message: 'error occured while fetching challenges' });
            }
        }
    }
]
exports.get_solved_challenges=[
    body('userId', 'user id is required').exists(),
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.info('validation error occured it get solved challenges method');
            res.status(500).json({ message: 'error occured while fetching solved challenges' });
        }
        else {
            let userId = req.body.userId;
            try {
                let challenges = await Challenge.find({ opponentId: userId,active:false,isAnswered:true});
                logger.info('challenges fetched successfully');
                logger.debug(JSON.stringify(challenges));
                challenges = challenges.map(challenge => {
                    let { question, choiceA, choiceB, choiceC, choiceD, creditPoints, hint, referenceLinks, opponentName, answer,isAnsweredCorrect,opponentSelectedAnswer} = challenge;
                    let challengeId = challenge._id;
                    let challengeData = { question, choiceA, choiceB, choiceC, choiceD, creditPoints, hint, referenceLinks, opponentName, answer,isAnsweredCorrect,opponentSelectedAnswer,challengeId };
                    return challengeData;
                }
                )
                res.status(200).json(challenges);
            }
            catch (error) {
                logger.info('validation error occured it get solved challenges method');
                res.status(500).json({ message: 'error occured while fetching solved challenges' });
            }
        }
    }
]