import { SET_CHALLENGES } from './constants';
const initialState = {
    challenges: []
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHALLENGES:
            return { ...state, challenges: action.challenges };
        default: return state;
    }
}

export default reducer;