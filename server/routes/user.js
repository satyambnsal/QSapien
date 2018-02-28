let express=require('express');
let router=express.Router();
let winston=require('winston');
import {user_login_post,user_signup_post,public_contacts_post} from '../controller/userController';

router.post('/login',user_login_post);
router.post('/signup',user_signup_post);

router.post('/publicContacts',public_contacts_post);
router.get('/check',(req,res)=>{
    res.json({message:'server is up and running'});
})
module.exports=router;