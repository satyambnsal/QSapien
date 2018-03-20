import {ADD_CONTACT_TO_FRIEND_LIST, SEND_CHALLENGE} from './constants';
import {SET_PUBLIC_CONTACTS,GET_PUBLIC_CONTACTS} from './constants';
import {GET_USER,SET_USER} from './constants';
import {GET_FRIEND_LIST,SET_FRIEND_LIST} from './constants';
import {GET_LEADERBOARD,SET_LEADERBOARD} from './constants';
export const setPublicContacts=(publicContacts)=>({
    type:SET_PUBLIC_CONTACTS,
    publicContacts
});
export const getPublicContacts=(userId)=>{
    console.log('--------inside get public contacts action');
    console.log('user id::'+userId);
    return {
        type:GET_PUBLIC_CONTACTS,
        userId
    };
}
export const setUser=(user)=>({
type:SET_USER,
user
})
export const getUser=(userId)=>({
    type:GET_USER,
    userId
});
export const addContactToFriendList=(userId,friendId)=>({
    type:ADD_CONTACT_TO_FRIEND_LIST,
    userId,friendId
});

export const getFriendList=(userId)=>({
    type:GET_FRIEND_LIST,
    userId
});
export const setFriendList=(friendList)=>({
type:SET_FRIEND_LIST,
friendList
});
export const sendChallenge=(values)=>({
    type:SEND_CHALLENGE,
    values
});
export const getLeaderboard=()=>({
    type:GET_LEADERBOARD
});
export const setLeaderboard=(leaderboard)=>({
    type:SET_LEADERBOARD,
    leaderboard
});