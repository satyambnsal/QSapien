import { SET_PUBLIC_CONTACTS, SET_USER, SET_FRIEND_LIST, SET_LEADERBOARD } from './constants';
import { combineReducers } from 'redux';
import challengeState from './PortalContent/Home/reducer';

const initialState = {
    messages: [],
    tasks: [],
    notifications: [],
    publicContacts: [],
    user: {},
    friendList: [],
    leaderboard: []
};
const userState = (state = initialState, action) => {
    switch (action.type) {
        case SET_PUBLIC_CONTACTS:
            return { ...state, publicContacts: action.publicContacts };
        case SET_USER:
            return { ...state, user: action.user };
        case SET_FRIEND_LIST:
            return { ...state, friendList: action.friendList }
        case SET_LEADERBOARD:
            return { ...state, leaderboard: action.leaderboard }
        default:
            return state;
    }
}
const indexReducer = combineReducers({
    userState,
    challengeState
})
export default indexReducer;