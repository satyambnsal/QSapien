import { SET_CHALLENGES, SOLVE_CHALLENGE_REQUESTING, SET_SOLVE_CHALLENGE_RESULT, RESET_SOLVE_CHALLENGE, SET_ASKED_CHALLENGES, SET_SOLVED_CHALLENGES, SET_SEND_CHALLENGE_RESULT, SEND_CHALLENGE } from './constants';
const initialState = {
    challenges: [],
    solveChallengeRequesting: false,
    solveChallengeSuccess: false,
    solveChallengeResult: null,
    askedChallenges: [],
    solvedChallenges: [],
    requestingSendChallenge: false,
    sendChallengeResult: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHALLENGES:
            return { ...state, challenges: action.challenges };
        case SOLVE_CHALLENGE_REQUESTING:
            return { ...state, solveChallengeRequesting: true };
        case SET_SOLVE_CHALLENGE_RESULT:
            return {
                ...state, solveChallengeRequesting: false, solveChallengeSuccess: true,
                solveChallengeResult: action.result
            }
        case RESET_SOLVE_CHALLENGE:
            return { ...state, solveChallengeRequesting: false, solveChallengeSuccess: false, solveChallengeResult: null }
        case SET_ASKED_CHALLENGES:
            return { ...state, askedChallenges: action.askedChallenges };
        case SET_SOLVED_CHALLENGES:
            return {
                ...state, solvedChallenges: action.solvedChallenges
            }
        case SEND_CHALLENGE:
            return { ...state, requestingSendChallenge: true, sendChallengeResult: null }
        case SET_SEND_CHALLENGE_RESULT:
            return { ...state, requestingSendChallenge: false, sendChallengeResult: action.result }
        default: return state;
    }
}

export default reducer;