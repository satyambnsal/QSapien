import {CLIENT_SET,CLIENT_UNSET,INITIALIZE_STATE} from './constants';

export function setClient(token){
    return{
        type:CLIENT_SET,
        token
    }
}
export function unsetClient(){
    return{
        type:CLIENT_UNSET
    }
}
export const initializeState=(userId)=>({
    type:INITIALIZE_STATE,userId
})