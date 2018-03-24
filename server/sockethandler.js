import {io} from '../server';
import Challenge from './models/Challenge';
import User from'./models/User';
import logger from 'winston';
exports.challengeHandler=async (values,callback)=>{
let opponentName;
let senderName;
logger.info('inside challenge handler function');
let values1=await User.findById(values.opponentId,'first_name last_name');
opponentName=values1.last_name ? (values1.first_name + ' ' + values1.last_name) : values1.first_name;
values1=await User.findById(values.senderId,'first_name last_name');
senderName=values1.last_name ? (values1.first_name + ' ' + values1.last_name) : values1.first_name;
let challengeData={...values,opponentName,senderName};
logger.debug('challenge data::'+JSON.stringify(challengeData));
let result=await Challenge.findOne({question:values.question,opponentId:values.opponentId,senderId:values.senderId});
if(!result){
 Challenge.create(challengeData,(err,data)=>{
     if(err){
         logger.info('error occured while saving challenge');
         callback({"message":'error occured while sending challenge.contact admin'})
     }
     else{
        callback({'message':'your challenge has been sent successfully'})
     }
 })   
}
else{
    callback({'message':'you have already asked this question before.we do not allow repeated questions'})
}
console.log('sender name:: '+senderName);
console.log('opponent name::'+opponentName);
logger.info('inside challenge handler function');
}