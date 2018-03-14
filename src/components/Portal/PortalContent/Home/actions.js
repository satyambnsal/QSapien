import {GET_CHALLENGES,SET_CHALLENGES, SOLVE_CHALLENGE} from './constants';

export const getChallenges=(userId)=>({
    type:GET_CHALLENGES,
    userId
});
export const setChallenges=(challenges)=>({
    type:SET_CHALLENGES,
    challenges
});
export const solveChallenge=(challengeId,selectedChoice)=>({
type:SOLVE_CHALLENGE,
challengeId,
selectedChoice
});