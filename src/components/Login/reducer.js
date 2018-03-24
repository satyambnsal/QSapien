import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, RESEND_ACTIVATION_MAIL, RESEND_ACTIVATION_MAIL_RESPONSE } from './constants';
const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
    resendActivationMailResponse:{},
    resendActivationMailRequesting: false
};
const reducer = function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: [{ body: "Login requesting....", time: new Date() }],
                errors: []
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                successful: true,
                errors: [],
                messages: []
            }
        case LOGIN_ERROR:
            return {
                ...state,
                errors: [action.error],
                requesting: false,
                successful: false,
                messages: []
            }
        case RESEND_ACTIVATION_MAIL:
        return {
            ...state,
            resendActivationMailRequesting:true,
            resendActivationMailResponse:{}
        }
        case RESEND_ACTIVATION_MAIL_RESPONSE:
        return{
            ...state,
            resendActivationMailRequesting:false,
            resendActivationMailResponse:action.response
        }
        default:
            return state;
    }

}
export default reducer;