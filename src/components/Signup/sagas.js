import {take,call,fork,put} from 'redux-saga/effects';
import {SIGNUP_REQUESTING,SIGNUP_SUCCESSFUL,SIGNUP_ERROR} from './constants';
import {handleApiErrors} from '../../lib/api-errors';

let REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://10.222.65.246:3001';
const SIGNUP_URL=`${REACT_APP_API_URL}/user/signup`;
console.log("SIGNUP_URL::"+SIGNUP_URL);
function signupAPI(signup_fields){
    console.log("SIGNUP FIELDS:: "+JSON.stringify(signup_fields));
    return fetch(SIGNUP_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(signup_fields)
    })
    .then(handleApiErrors)
    .then(response=>response.json())
    .catch(errors=>{throw errors})
}

function* signupFlow(signup_fields){
    try{
        yield call(signupAPI,signup_fields);
        yield put({type:SIGNUP_SUCCESSFUL});
    }
    catch(error){
        yield put({type:SIGNUP_ERROR,error})
    }
}
function* signupWatcher(){
    while(true){
        const signup_fields=yield take(SIGNUP_REQUESTING);
        yield fork(signupFlow,signup_fields);
    }
}
export default  signupWatcher;