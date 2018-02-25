import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: []
};
const reducer = function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: "Login requesting....", time: new Date() }],
                errors: []
            }
        case LOGIN_SUCCESS:
            return {
                requesting: false,
                successful: true,
                errors: [],
                messages: []
            }
        case LOGIN_ERROR:
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date()
                }]),
                requesting: false,
                successful: false,
                messages: []
            }
            default:
            return state;
    }

}
export default reducer;