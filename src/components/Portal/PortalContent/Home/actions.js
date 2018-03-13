import {GET_CHALLENGES,SET_CHALLENGES} from './constants';

export const getChallenges=(userId)=>({
    type:GET_CHALLENGES,
    userId
});
export const setChallenges=(challenges)=>({
    type:SET_CHALLENGES,
    challenges
});