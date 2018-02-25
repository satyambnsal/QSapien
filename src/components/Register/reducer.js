import {REGISTER_REQUESTING,REGISTER_SUCCESSFUL,REGISTER_ERROR} from './constants';

let initialState={
    requesting:false,
    successful:false,
    errors:[],
    messages:[]
};
const reducer=function(state=initialState,action){
    switch(action.type){
        case REGISTER_REQUESTING:
        return {
            requesting:true,messages:[{body:"Register requesting...",time:new Date()}],...state
        };
        case REGISTER_SUCCESSFUL:
        return {
            successful:true,
            requesting:false,
            errors:[],
            messages:[]
        };
        case REGISTER_ERROR:
        return {
            errors:state.errors.concat([
            {body:action.error.toString(),time:new Date()}]),...state
        }
        default:
        return state;
    }
}
export default reducer;