import {SET_PUBLIC_CONTACTS,SET_USER,SET_FRIEND_LIST} from './constants';
let initialState={
    messages:[],
    tasks:[],
    notifications:[],
    publicContacts:[],
    user:{},
    friendList:[]
};
let reducer=(state=initialState,action)=>{
    console.log('inside reducer');
switch(action.type){
    case SET_PUBLIC_CONTACTS:
    return{...state,publicContacts:action.publicContacts};
    case SET_USER:
    return {...state,user:action.user};
    case SET_FRIEND_LIST:
    return {...state,friendList:action.friendList}
    default:
    return state;
}    
}
export default reducer;