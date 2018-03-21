import {call, put,takeLatest} from 'redux-saga/effects';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';
import { setClient} from '../Client/actions';
import {getUserApi,getPublicContactsApi,getLeaderboardApi} from '../Portal/sagas';
import {fetchChallengesApi,fetchAskedChallengesApi,fetchSolvedChallengesApi} from '../Portal/PortalContent/Home/sagas';
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
    .then(response =>response.json())
    .catch((errors) => {
        console.log(errors);
         throw errors })
}
function* initializeState({userId}){
    try{
        yield call(getUserApi,{userId});
        yield call(getPublicContactsApi,{userId});
        yield call(fetchChallengesApi,{userId});
        yield call(fetchAskedChallengesApi,{userId});
        yield call(fetchSolvedChallengesApi,{userId});
        yield call(getLeaderboardApi);;
        return true;
    }
    catch(error){
        yield put({ type: LOGIN_ERROR,error:{message:'empty token error'}});
        return false;
    }
}
function* loginFlow({email_id, password}) {
    let token,resp;
    try {
        resp = yield call(loginAPI,email_id, password);
        console.log('resp',JSON.stringify(resp));
        token=resp.token;
        if(token){
            yield put(setClient(token));
            localStorage.setItem('token', JSON.stringify(token));
            const initializeStateSuccess=yield call(initializeState,{userId:token.userId});
            if(initializeStateSuccess)
            yield put({ type: LOGIN_SUCCESS });
        }
        else if(resp.success==false&&resp.isAccountVerified==false){
            yield put({ type: LOGIN_ERROR,error:{isAccountVerified:false,success:false,message:resp.message}})            
        }
        else{
            yield put({ type: LOGIN_ERROR,error:{message:"empty token error"}})         
        }

    }
    catch (error) {
        console.log('error occured:: '+JSON.stringify(error));
        yield put({ type: LOGIN_ERROR,error:{message:error.toString()}})
    }
}

export  function* loginWatcher() {
yield takeLatest(LOGIN_REQUESTING,loginFlow);
yield takeLatest(INITIALIZE_STATE,initializeState);
}
