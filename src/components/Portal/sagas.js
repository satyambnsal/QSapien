import { take,call, put} from 'redux-saga/effects';
import {GET_PUBLIC_CONTACTS, ADD_CONTACT_TO_FRIEND_LIST, GET_FRIEND_LIST,SEND_CHALLENGE, GET_USER} from './constants';

import { handleApiErrors } from '../../lib/api-errors';
import { setPublicContacts, setFriendList,setUser} from './actions';
import {sendChallengeSocketApi} from './socketapi';
let REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://localhost:3001';
const GET_PUBLIC_CONTACTS_URL = `${REACT_APP_API_URL}/user/publicContacts`;
const ADD_CONTACT_TO_FRIEND_LIST_URL=`${REACT_APP_API_URL}/user/addToFriendList`
const GET_FRIEND_LIST_URL=`${REACT_APP_API_URL}/user/getFriendList`;
const GET_USER_URL=`${REACT_APP_API_URL}/user/getUser`;

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
function* getFriendListApi(userId){
    console.log('-------inside get friend list api------');
    console.log('-----user id---------'+userId);
    try{
     let friendList=yield fetch(GET_FRIEND_LIST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId})
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    console.log('fetched records inside get friend list api::'+JSON.stringify(friendList));
    yield put(setFriendList(friendList));
    }
    catch(error){
        console.log('error occured in get friend list api');
    }
}
function* getUserApi(userId){
    console.log('inside get user api method');
try{
    let user=yield fetch(GET_USER_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({userId})
    }).then(handleApiErrors).then(response=>response.json());
    console.log('-------user object-------'+JSON.stringify(user));

    yield put(setUser(user));
}
catch(error){
    console.log('error occured in get user api');
}
}
export default function* contactRequestWatcher(){
    while(true){
        const action=yield take([GET_PUBLIC_CONTACTS,ADD_CONTACT_TO_FRIEND_LIST,GET_FRIEND_LIST,SEND_CHALLENGE,GET_USER]);
        if(action.type===GET_PUBLIC_CONTACTS)
        yield call(getPublicContactsApi,action.userId);
        if(action.type===ADD_CONTACT_TO_FRIEND_LIST)
        yield call(addContactToFriendListApi,action.userId,action.friendId);
        if(action.type===GET_FRIEND_LIST)
        yield call(getFriendListApi,action.userId)
        if(action.type===SEND_CHALLENGE){
            console.log('inside action--84');
            yield call(sendChallengeSocketApi,action.values);
        }
        if(action.type===GET_USER){
            yield call(getUserApi,action.userId)
        }
    }
}
