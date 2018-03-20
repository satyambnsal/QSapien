import {GET_CHALLENGES,SET_CHALLENGES, SOLVE_CHALLENGE_REQUESTING, SET_SOLVE_CHALLENGE_RESULT, RESET_SOLVE_CHALLENGE, GET_ASKED_CHALLENGES, SET_ASKED_CHALLENGES, GET_SOLVED_CHALLENGES, SET_SOLVED_CHALLENGES} from './constants';

export const getChallenges=(userId)=>({
    type:GET_CHALLENGES,
    userId
});
export const setChallenges=(challenges)=>({
    type:SET_CHALLENGES,
    challenges
});

export const getAskedChallenges=(userId)=>({
    type:GET_ASKED_CHALLENGES,
    userId
});
export const setAskedChallenges=(askedChallenges)=>({
    type:SET_ASKED_CHALLENGES,
    askedChallenges
});
export const getSolvedChallenges=(userId)=>({
    type:GET_SOLVED_CHALLENGES,
    userId
});
export const setSolvedChallenges=(solvedChallenges)=>({
type:SET_SOLVED_CHALLENGES,
solvedChallenges
})
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