import mongoose from 'mongoose';
import User from './User'
let Schema=mongoose.Schema;
let ChallengeSchema=new Schema({
    opponentId:{type:Schema.Types.ObjectId,ref:'User',required:true},
    opponentName:{type:String,required:true},
    senderId:{type:Schema.Types.ObjectId,ref:'User',required:true},
    senderName:{type:String,required:true},
    question:{type:String,required:true},
    choiceA:{type:String,required:true},
    choiceB:{type:String,required:true},
    choiceC:{type:String,required:true},
    choiceD:{type:String,required:true},
    answer:{type:String,required:true},
    isAnswered:{type:Boolean,Default:false},
    isAnsweredCorrect:{type:Boolean},
    opponentSelectedAnswer:String,
    creditPoints:{type:Number,required:true},
    hint:String,
    referenceLinks:String,
    active:{type:Boolean,default:true},
    timestamp:{type:Date,default:new Date()}
});
module.exports=mongoose.model('Challenge',ChallengeSchema);