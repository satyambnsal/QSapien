import {CLIENT_SET,CLIENT_UNSET} from './constants';

const initialState={
    id:null,
    token:null
};
const reducer=function(state=initialState,action){
switch(action.type){
    case CLIENT_SET:
    return{
        id:action.token.userid,
        token:action.token
    };
    case CLIENT_UNSET:
    return{
        id:null,
        token:null
    };
    default:
    return state;
}
}
export default reducer;