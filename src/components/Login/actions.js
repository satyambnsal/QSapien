import {LOGIN_REQUESTING} from './constants';

const loginRequest=function({email_id,password}){
    return{
        type:LOGIN_REQUESTING,
        email_id,
        password
    };
}
export default loginRequest;