import {SET_PERSONAL_CONTACTS,GET_PERSONAL_CONTACTS, ADD_CONTACT_TO_FRIEND_LIST} from './constants';
import {SET_PUBLIC_CONTACTS,GET_PUBLIC_CONTACTS} from './constants';
import {SET_USER} from './constants';
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
export const setPersonalContacts=(personalContacts)=>({
    type:SET_PERSONAL_CONTACTS,
    personalContacts
});
export const getPersonalContacts=()=>({
    type:GET_PERSONAL_CONTACTS
});
export const setUser=(userId)=>({
    type:SET_USER,
    userId
});
export const addContactToFriendList=(userId,friendId)=>({
    type:ADD_CONTACT_TO_FRIEND_LIST,
    userId,friendId
});