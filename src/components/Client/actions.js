import {CLIENT_SET,CLIENT_UNSET} from './constants';

export function setClient(token){
    return{
        type:CLIENT_SET,
        token
    }
}
export function unsetClient(){
    console.log('inside unset client111');
    return{
        type:CLIENT_UNSET
    }
}