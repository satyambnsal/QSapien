import {takeLatest,call,put} from 'redux-saga/effects';
import {SIGNUP_REQUESTING,SIGNUP_SUCCESSFUL,SIGNUP_ERROR} from './constants';

let REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://10.222.65.246:3001';
const SIGNUP_URL=`${REACT_APP_API_URL}/user/signup`;

function signupAPI(signup_fields){
    console.log("SIGNUP FIELDS:: "+JSON.stringify(signup_fields));
    return fetch(SIGNUP_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(signup_fields)
    })
    .then(response=>response.json())
    .catch(errors=>{throw errors})
}

function* signupFlow({signup_fields}){
console.log('signup fields',signup_fields);
    try{
        const response=yield call(signupAPI,signup_fields);
        console.log('response::',JSON.stringify(response));
        if(response.success)
        yield put({type:SIGNUP_SUCCESSFUL});
        else
        yield put({type:SIGNUP_ERROR,error:{...response}})
    }
    catch(error){
        console.log(error);
        yield put({type:SIGNUP_ERROR,error:{message:error.toString()}})
    }
}
function* signupWatcher(){
    yield takeLatest(SIGNUP_REQUESTING,signupFlow);
}
export default  signupWatcher;