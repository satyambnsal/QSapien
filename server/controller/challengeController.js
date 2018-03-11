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
                res.status(200).json({challenges});
            }
            catch(error){
                console.log('error::'+JSON.stringify(error));
                res.status(500).json({message:'error occured while fetching challenges'});
            }
        }
    }
]