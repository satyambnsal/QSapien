import { take, fork, call, put,takeLatest} from 'redux-saga/effects';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { setClient} from '../Client/actions';
import {getUserApi,getPublicContactsApi} from '../Portal/sagas';
import {fetchChallengesApi} from '../Portal/PortalContent/Home/sagas';
import { handleApiErrors } from '../../lib/api-errors';
import { INITIALIZE_STATE } from '../Client/constants';
let REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://localhost:3001';
const LOGIN_URL = `${REACT_APP_API_URL}/user/login`;

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
function* initializeState({userId}){
    console.log('inside initialize state::',userId);
    try{
        yield call(getUserApi,{userId});
        yield call(getPublicContactsApi,{userId});
        yield call(fetchChallengesApi,{userId});
    }
    catch(error){
    return error;
    }
}
function* loginFlow({email_id, password}) {
    let token,resp;
    console.log('inside login flow saga');
    try {
        resp = yield call(loginAPI,email_id, password);
        token=resp.token;
        console.log('token value:: '+token);
        if(token){
            console.log('login flow in condition');
            yield put(setClient(token));
            localStorage.setItem('token', JSON.stringify(token));
            const initializeStateSuccess=yield call(initializeState,{userId:token.userId});
            if(initializeStateSuccess)
            yield put({ type: LOGIN_SUCCESS });
        }
        else{
            yield put({ type: LOGIN_ERROR,error:"empty token error"})         
        }

    }
    catch (error) {
        console.log('error occured:: '+JSON.stringify(error));
        yield put({ type: LOGIN_ERROR, error })
    }
}

export  function* loginWatcher() {
yield takeLatest(LOGIN_REQUESTING,loginFlow);
yield takeLatest(INITIALIZE_STATE,initializeState);
}
