import {LOGIN_REQUESTING, RESEND_ACTIVATION_MAIL, RESEND_ACTIVATION_MAIL_RESPONSE} from './constants';

const loginRequest=function({email_id,password}){
    return{
        type:LOGIN_REQUESTING,
        email_id,
        password
    };
}
export const resendActivationMail=({email_id})=>({
    type:RESEND_ACTIVATION_MAIL,
    email_id
});
export const resendActivationMailResponse=(response)=>({
    type:RESEND_ACTIVATION_MAIL_RESPONSE,
    response
});
export default loginRequest;