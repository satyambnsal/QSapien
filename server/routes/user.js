let express=require('express');
let router=express.Router();
let winston=require('winston');
import {user_signup_post} from '../controller/userController';

//router.post('login',user_login_post);
router.post('signup',user_signup_post);

module.exports=router;