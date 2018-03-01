import {ADD_CONTACT_TO_FRIEND_LIST} from './constants';
import {SET_PUBLIC_CONTACTS,GET_PUBLIC_CONTACTS} from './constants';
import {SET_USER} from './constants';
import {GET_FRIEND_LIST,SET_FRIEND_LIST} from './constants';

export const setPublicContacts=(publicContacts)=>({
    type:SET_PUBLIC_CONTACTS,
    publicContacts
});
export const getPublicContacts=(userId)=>{
    console.log('--------inside get public contacts action');
    return {
        type:GET_PUBLIC_CONTACTS,
        userId
    };
}
export const setUser=(userId)=>({
    type:SET_USER,
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