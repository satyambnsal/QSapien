import { SIGNUP_REQUESTING, SIGNUP_SUCCESSFUL, SIGNUP_ERROR } from './constants';

let initialState = {
    requesting: false,
    successful: false,
    errors: [],
    messages: []
};
const reducer = function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP_REQUESTING:
            return {
                ...state, requesting: true
            };
        case SIGNUP_SUCCESSFUL:
            return {
                successful: true,
                requesting: false,
                errors: [],
                messages: []
            };
        case SIGNUP_ERROR:
            return {
                ...state, errors: [action.error],requesting:false,successful:false
            }
        default:
            return state;
    }
}
export default reducer;