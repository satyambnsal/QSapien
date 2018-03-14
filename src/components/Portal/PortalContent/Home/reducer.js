import { SET_CHALLENGES,SOLVE_CHALLENGE_REQUESTING,SET_SOLVE_CHALLENGE_RESULT, RESET_SOLVE_CHALLENGE} from './constants';
const initialState = {
    challenges: [],
    solveChallengeRequesting:false,
    solveChallengeSuccess:false,
    solveChallengeResult:null    
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHALLENGES:
            return { ...state, challenges: action.challenges };
        case SOLVE_CHALLENGE_REQUESTING:
        return {...state,solveChallengeRequesting:true};
        case SET_SOLVE_CHALLENGE_RESULT:
        return {...state,solveChallengeRequesting:false,solveChallengeSuccess:true,
            solveChallengeResult:action.result}
            case RESET_SOLVE_CHALLENGE:
            return{...state,solveChallengeRequesting:false,solveChallengeSuccess:false,solveChallengeResult:null}
        default: return state;
    }
}

export default reducer;