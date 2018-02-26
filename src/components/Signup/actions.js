import {SIGNUP_REQUESTING} from './constants';
//import logger from 'winston';
export const signupRequesting=function(signup_fields){
//logger.info('register requesting action entry point::');
//logger.debug('register requesting body::'+JSON.stringify(register_fields));
//    console.log(register_fields);
    return{
        type:SIGNUP_REQUESTING,
        signup_fields
    }
};