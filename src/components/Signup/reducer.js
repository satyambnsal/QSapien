import {SIGNUP_REQUESTING,SIGNUP_SUCCESSFUL,SIGNUP_ERROR} from './constants';
//import logger from 'winston';
let initialState={
    requesting:false,
    successful:false,
    errors:[],
    messages:[]
};
const reducer=function(state=initialState,action){
  //  logger.info('Register reducer method entry point');
    switch(action.type){
        case SIGNUP_REQUESTING:
        return {
            requesting:true,messages:[{body:"Register requesting...",time:new Date()}],...state
        };
        case SIGNUP_SUCCESSFUL:
        return {
            successful:true,
            requesting:false,
            errors:[],
            messages:[]
        };
        case SIGNUP_ERROR:
        return {
            errors:state.errors.concat([
            {body:action.error.toString(),time:new Date()}]),...state
        }
        default:
        return state;
    }
}
export default reducer;