import mongoose from 'mongoose';
import User from './User';

let Schema=mongoose.Schema;
let FriendListSchema=new Schema({
userId:{type:String,required:true,unique:true},
friendList:[{type:Schema.Types.ObjectId,ref:'User'}]
});

module.exports=mongoose.model('FriendList',FriendListSchema);