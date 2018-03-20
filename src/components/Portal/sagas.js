import { take, call, put } from 'redux-saga/effects';
import { GET_PUBLIC_CONTACTS, ADD_CONTACT_TO_FRIEND_LIST, GET_FRIEND_LIST, SEND_CHALLENGE, GET_USER } from './constants';

import { handleApiErrors } from '../../lib/api-errors';
import { setPublicContacts, setFriendList, setUser,setLeaderboard} from './actions';
import { sendChallengeSocketApi } from './socketapi';
let REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const GET_PUBLIC_CONTACTS_URL = `${REACT_APP_API_URL}/user/publicContacts`;
const ADD_CONTACT_TO_FRIEND_LIST_URL = `${REACT_APP_API_URL}/user/addToFriendList`
const GET_FRIEND_LIST_URL = `${REACT_APP_API_URL}/user/getFriendList`;
const GET_USER_URL = `${REACT_APP_API_URL}/user/getUser`;
const GET_LEADERBOARD_URL = `${REACT_APP_API_URL}/user/leaderboard`;
export function* getPublicContactsApi({ userId }) {
    console.log('-------inside get public contacts api------');
    try {
        let publicContacts = yield fetch(GET_PUBLIC_CONTACTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
            .then(handleApiErrors)
            .then(response => response.json())
            .then(json => json)
        yield put(setPublicContacts(publicContacts));
    }
    catch (error) {
        console.log('error occured in get public contacts api');
    }
}

function* addContactToFriendListApi({ userId, friendId }) {
    console.log("-----inside add contact to friend list api-------");
    try {
        yield fetch(ADD_CONTACT_TO_FRIEND_LIST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, friendId })
        }).then(handleApiErrors)
            .then(response => response.json())
    }
    catch (error) {
        console.log('error occured in add contact to friend list api');

    }
}
function* getFriendListApi({ userId }) {
    console.log('-------inside get friend list api------');
    try {
        let friendList = yield fetch(GET_FRIEND_LIST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
            .then(handleApiErrors)
            .then(response => response.json())
        yield put(setFriendList(friendList));
    }
    catch (error) {
        console.log('error occured in get friend list api');
    }
}
export function* getUserApi({ userId }) {
    try {
        let user = yield fetch(GET_USER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        }).then(handleApiErrors).then(response => response.json());

        yield put(setUser(user));
    }
    catch (error) {
        console.log('error occured in get user api');
    }
}
export default function* contactRequestWatcher() {
    while (true) {
        const action = yield take([GET_PUBLIC_CONTACTS, ADD_CONTACT_TO_FRIEND_LIST, GET_FRIEND_LIST, SEND_CHALLENGE, GET_USER]);
        if (action.type === GET_PUBLIC_CONTACTS)
            yield call(getPublicContactsApi, action);
        if (action.type === ADD_CONTACT_TO_FRIEND_LIST)
            yield call(addContactToFriendListApi, action);
        if (action.type === GET_FRIEND_LIST)
            yield call(getFriendListApi, action)
        if (action.type === SEND_CHALLENGE) {
            yield call(sendChallengeSocketApi, action);
        }
        if (action.type === GET_USER) {
            yield call(getUserApi, action)
        }
    }
}
export function* getLeaderboardApi() {
    console.log('-------inside get leaderboard api------');
    try {
        let leaderboard = yield fetch(GET_LEADERBOARD_URL, {
            method: 'GET'
        }).then(handleApiErrors).then(response => response.json())

        yield put(setLeaderboard(leaderboard));
    }
    catch (error) {
        console.log('error occured in get leaderboard api');
    }
}