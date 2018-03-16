import {GET_CHALLENGES,SET_CHALLENGES, SOLVE_CHALLENGE_REQUESTING, SET_SOLVE_CHALLENGE_RESULT, RESET_SOLVE_CHALLENGE} from './constants';

export const getChallenges=(userId)=>({
    type:GET_CHALLENGES,
    userId
});
export const setChallenges=(challenges)=>({
    type:SET_CHALLENGES,
    challenges
});
export const solveChallenge=(challengeId,selectedChoice)=>({
type:SOLVE_CHALLENGE_REQUESTING,
challengeId,
selectedChoice
});
export const setSolveChallengeResult=(result)=>({
    type:SET_SOLVE_CHALLENGE_RESULT,
    result
});
export const resetSolveChallenge=()=>({
    type:RESET_SOLVE_CHALLENGE
})