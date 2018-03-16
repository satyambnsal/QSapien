import { SET_PUBLIC_CONTACTS, SET_USER, SET_FRIEND_LIST } from './constants';
import { combineReducers } from 'redux';
import challengeState from './PortalContent/Home/reducer';

const initialState = {
    messages: [],
    tasks: [],
    notifications: [],
    publicContacts: [],
    user: {},
    friendList: []
};
const userState = (state = initialState, action) => {
    switch (action.type) {
        case SET_PUBLIC_CONTACTS:
            return { ...state, publicContacts: action.publicContacts };
        case SET_USER:
            return { ...state, user: action.user };
        case SET_FRIEND_LIST:
            return { ...state, friendList: action.friendList }
        default:
            return state;
    }
}
const indexReducer=combineReducers({
    userState,
    challengeState
})
export default indexReducer;