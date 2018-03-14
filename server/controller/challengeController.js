import Challenge from '../models/Challenge';
import logger from 'winston';
import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import mongoose from 'mongoose';
exports.get_challenges_post=[
    body('userId','user id is required').exists(),
    async (req,res)=>{
        let errors=validationResult(req);
        if(!errors.isEmpty()){
            res.status(500).json({message:'error occured while fetching challenges 11'});
        }
        else{
            let userId=req.body.userId;
            console.log('userId::'+userId);
            try{
                let challenges=await Challenge.find({opponentId:userId,active:true});
                logger.info('--------fetched challenges-------');
                logger.debug(JSON.stringify(challenges));
                challenges=challenges.map(challenge=>{
                    let {question,choiceA,choiceB,choiceC,choiceD,creditPoints,hint,referenceLinks,opponentName,senderName}=challenge;
                    let challengeId=challenge._id;
                    let challengeData={question,choiceA,choiceB,choiceC,choiceD,creditPoints,hint,referenceLinks,opponentName,senderName,challengeId};
                    return challengeData;
                }
                    
                )
                res.status(200).json(challenges);
            }
            catch(error){
                console.log('error::'+JSON.stringify(error));
                res.status(500).json({message:'error occured while fetching challenges'});
            }
        }
    }
]
exports.solve_challenge_post=[
 body('selectedChoice','answer field is required to solve challenge').exists(),
 body('challengeId','challenge id is required to solve challenge').exists(),
 async (req,res)=>{
     logger.info('challenge solve method entry point');
    let errors=validationResult(req);
    if(!errors.isEmpty()){
        logger.debug('validation error occured::'+JSON.stringify(errors));
        res.status(500).json({isCheckSuccess:false,message:'error occured while solving challenge'});
    }
    else{
        const {selectedChoice,challengeId}=req.body;
        try{
        const challenge=await Challenge.findById(challengeId);
        logger.info('challenge details::'+JSON.stringify(challenge));
        if(challenge){
        if(challenge.answer.toLowerCase()===selectedChoice.toLowerCase()){
            logger.info('congrats! you have made the right choice');
            res.status(200).json({isCheckSuccess:true,isChoiceCorrect:true,messgage:'congrats! you have made the right choice'});
        }
        else{
            res.status(200).json({isCheckSuccess:true,isChoiceCorrect:false,messgage:'Oops you have made wrong choice.'});
        }
        }
        else{
        res.status(404).json({isCheckSuccess:false,messgae:'challenge with specified challenge Id not found'});
        }
        }
        catch(error){
            logger.info('error occured while solving challenge');
            logger.debug('error details::'+JSON.stringify(error));
            res.status(500).json({isCheckSuccess:false,message:'error occured while solving challenge.maybe you had provided wrong challenge ID'});
        }
    }
 }   
]