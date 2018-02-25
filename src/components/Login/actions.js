import {LOGIN_REQUESTING} from './constants';

const loginRequest=function({username,password}){
    return{
        type:LOGIN_REQUESTING,
        username,
        password
    };
}
export default loginRequest;