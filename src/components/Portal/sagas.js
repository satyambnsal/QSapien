import { take, fork, cancel, call, put, cancelled,takeEvery,takeLatest} from 'redux-saga/effects';
import {GET_PUBLIC_CONTACTS,SET_PUBLIC_CONTACTS, ADD_CONTACT_TO_FRIEND_LIST} from './constants';


import { handleApiErrors } from '../../lib/api-errors';
import { getPublicContacts, setPublicContacts } from './actions';
let REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://localhost:3001';
const GET_PUBLIC_CONTACTS_URL = `${REACT_APP_API_URL}/user/publicContacts`;
const ADD_CONTACT_TO_FRIEND_LIST_URL=`${REACT_APP_API_URL}/user/addToFriendList`
function* getPublicContactsApi(userId){
    console.log('-------inside get public contacts api------');
    console.log('-----user id---------'+userId);
    try{
     let publicContacts=yield fetch(GET_PUBLIC_CONTACTS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId})
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    console.log('fetched records::'+JSON.stringify(publicContacts));
    yield put(setPublicContacts(publicContacts));
    }
    catch(error){
        console.log('error occured in get public contacts api');
    }
}
function* addContactToFriendListApi(userId,friendId){
    console.log("-----inside api function-------");
    console.log('------------user id----------'+userId);
    console.log('-----------friend id------------'+friendId);
try{
yield fetch(ADD_CONTACT_TO_FRIEND_LIST_URL,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({userId,friendId})
}).then(handleApiErrors)
.then(response=>response.json())
.then(json=>json)
}
catch(error){
    console.log('error occured in add contact to friend list api');
    
}
}
export function* contactRequestWatcher(){
    while(true){
        const action=yield take([GET_PUBLIC_CONTACTS,ADD_CONTACT_TO_FRIEND_LIST]);
        if(action.type==GET_PUBLIC_CONTACTS)
        yield call(getPublicContactsApi,action.userId);
        if(action.type==ADD_CONTACT_TO_FRIEND_LIST)
        yield call(addContactToFriendListApi,action.userId,action.friendId);
    }
}
