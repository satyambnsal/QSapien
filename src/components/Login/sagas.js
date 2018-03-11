import { take, fork, cancel, call, put, cancelled} from 'redux-saga/effects';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { setClient, unsetClient } from '../Client/actions';
import { CLIENT_UNSET } from '../Client/constants';
import history from '../../history.js';

import { handleApiErrors } from '../../lib/api-errors';
let REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://localhost:3001';
const LOGIN_URL = `${REACT_APP_API_URL}/user/login`;

//logger.info('LOGIN URL:: '+LOGIN_URL);
function loginAPI(email_id, password) {
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email_id, password })
    })
    .then(handleApiErrors)
    .then(response =>response.json())
    .then(json => json)
    .catch((errors) => { throw errors })
}

export function* logout() {
    yield put(unsetClient());
    localStorage.removeItem('token')
    yield call(history.push,'/login');
}

function* loginFlow(email_id, password) {
    let token,resp;
    console.log('inside login flow saga');
    try {
        resp = yield call(loginAPI,email_id, password);
        token=resp.token;
        console.log('token value:: '+token);
        if(token){
            yield put(setClient(token));
            yield put({ type: LOGIN_SUCCESS });
    
            localStorage.setItem('token', JSON.stringify(token));
            //  logger.info('login successful');
            yield call(history.push,'/portal');    
        }
        else{
            yield put({ type: LOGIN_ERROR,error:"empty token error"})         
        }

    }
    catch (error) {
        console.log('error occured:: '+JSON.stringify(error));
        yield put({ type: LOGIN_ERROR, error })
    }
    finally {
        console.log('inside finally block');
        if (yield cancelled()) {
            yield call(history.push,'/login');
        }
    }
    return token;
}

export function* loginWatcher() {
    while (true) {
        const { email_id, password } = yield take(LOGIN_REQUESTING);
        const task = yield fork(loginFlow,email_id, password);
        const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
        console.log('action::'+action.type);
        if (action.type===CLIENT_UNSET){
            yield cancel(task);
            yield call(logout);
        }
    
    }
}
