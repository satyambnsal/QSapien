import {SET_PUBLIC_CONTACTS,SET_USER} from './constants';
let initialState={
    messages:[],
    tasks:[],
    notifications:[],
    publicContacts:[],
    userId:null
};
let reducer=(state=initialState,action)=>{
    console.log('inside reducer');
switch(action.type){
    case SET_PUBLIC_CONTACTS:
    return{...state,publicContacts:action.publicContacts};
    case SET_USER:
    return {...state,userId:action.userId};
    default:
    return state;
}    
}
export default reducer;