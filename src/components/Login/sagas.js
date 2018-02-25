import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { setClient, unsetClient } from '../Client/actions';
import { CLIENT_UNSET } from '../Client/constants';
import history from '../../history.js';
//import {browserHistory} from 'react-router-dom';
import { handleApiErrors } from '../../lib/api-errors';

//const loginURL = `${process.env.REACT_APP_API_URL}/api/login`;
const loginURL = `http://localhost:3001/api/login`;

console.log("===========login url: ==========" + loginURL);
function loginAPI(username, password) {
    return fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((errors) => { throw errors })
}

function* logout() {
    yield put(unsetClient());
    localStorage.removeItem('token')
    yield call(history.push,'/login');
}

function* loginFlow(username, password) {
    let token;
    try {
        token = yield call(loginAPI, username, password);
        yield put(setClient(token));
        yield put({ type: LOGIN_SUCCESS });

        localStorage.setItem('token', JSON.stringify(token));
        console.log("========login successful=======");
        yield call(history.push,'/portal');

    }
    catch (error) {
        yield put({ type: LOGIN_ERROR, error })
    }
    finally {
        if (yield cancelled()) {
            yield call(history.push,'/login');
        }
    }
    return token;
}

function* loginWatcher() {
    while (true) {
        const { username, password } = yield take(LOGIN_REQUESTING);
        const task = yield fork(loginFlow, username, password);
        const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);

        if (action.type === CLIENT_UNSET)
            yield cancel(task);
        yield call(logout);
    }
}
export default loginWatcher;