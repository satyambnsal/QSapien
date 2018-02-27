let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let UserSchema=new Schema({
    first_name:{type:String,required:true},
    last_name:String,
    email_id:{type:String,required:true},
    profile_image:{data:Buffer,contentType:String},
    contact_no:{type:String,required:true},
    credit_points:Number,
    password:{type:String,required:true}
});
module.exports=mongoose.model('User',UserSchema);