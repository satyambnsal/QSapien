import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, RESEND_ACTIVATION_MAIL } from './constants';
import { setClient} from '../Client/actions';
import { getUserApi, getPublicContactsApi, getLeaderboardApi } from '../Portal/sagas';
import { fetchChallengesApi, fetchAskedChallengesApi, fetchSolvedChallengesApi } from '../Portal/PortalContent/Home/sagas';
import { handleApiErrors } from '../../lib/api-errors';
import { INITIALIZE_STATE } from '../Client/constants';
import { resendActivationMailResponse } from './actions';
let REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const LOGIN_URL = `${REACT_APP_API_URL}/user/login`;
const RESEND_ACTIVATION_MAIL_URL = `${REACT_APP_API_URL}/user/resendActivationToken`;
function loginAPI(email_id, password) {
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_id, password })
    })
        .then(response => response.json())
        .catch((errors) => {
            throw errors
        })
}
function* resendActivationMailApi({ email_id }) {
    try {
        const response = yield fetch(RESEND_ACTIVATION_MAIL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_id })
        }).then(response => response.json())
        console.log('resend activation mail response',response);
        yield put(resendActivationMailResponse(response));
    }
    catch(error){
        console.log('error occured in resend activation mail api');
    }
}
function* initializeState({ userId }) {
    try {
        yield call(getUserApi, { userId });
        yield call(getPublicContactsApi, { userId });
        yield call(fetchChallengesApi, { userId });
        yield call(fetchAskedChallengesApi, { userId });
        yield call(fetchSolvedChallengesApi, { userId });
        yield call(getLeaderboardApi);;
        return true;
    }
    catch (error) {
        yield put({ type: LOGIN_ERROR, error: { message: 'empty token error' } });
        return false;
    }
}
function* loginFlow({ email_id, password }) {
    try {
        const response = yield call(loginAPI, email_id, password);
        const token = response.token;
        if (response.success && token) {
            yield put(setClient(token));
            localStorage.setItem('token', JSON.stringify(token));
            const initializeStateSuccess = yield call(initializeState, { userId: token.userId });
            if (initializeStateSuccess)
                yield put({ type: LOGIN_SUCCESS });
        }
        else {
            yield put({ type: LOGIN_ERROR, error: { ...response } })
        }
    }
    catch (error) {
        yield put({ type: LOGIN_ERROR, error: { message: error.toString() } })
    }
}
export function* loginWatcher() {
    yield takeLatest(LOGIN_REQUESTING, loginFlow);
    yield takeLatest(INITIALIZE_STATE, initializeState);
    yield takeLatest(RESEND_ACTIVATION_MAIL, resendActivationMailApi)
}
