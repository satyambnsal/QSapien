let mongoose=require('mongoose');
let Schema=mongoose.Schema;
const REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://localhost:3001';
let UserSchema=new Schema({
    first_name:{type:String,required:true},
    last_name:String,
    email_id:{type:String,required:true},
    contact_no:{type:String},
    credit_points:{type:Number,default:0},
    password:{type:String,required:true},
    profile_image_url:{type:String,default:`${REACT_APP_API_URL}/profileImages/default_profile.jpg`},
    username:{type:String,required:true},
    location:{type:String,default:'India'},
    website:String,
    bio:{type:String,default:'A wise sapien and decent human being'},
    isVerified:{type:Boolean,default:false}
});
UserSchema.virtual('name').get(function(){
    return this.first_name+' '+this.last_name
});
module.exports=mongoose.model('User',UserSchema);