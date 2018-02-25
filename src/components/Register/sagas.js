import {take,call,fork,put} from 'redux-saga/effects';


import {REGISTER_REQUESTING,REGISTER_SUCCESSFUL,REGISTER_ERROR} from './constants';
import history from '../../history.js';
import {handleApiErrors} from '../../lib/api-errors';
//const REGISTER_URL=`${process.env.REACT_APP_API_URL}/api/register`;
const REGISTER_URL=`http://localhost:3001/api/register`;

function registerAPI(register_fields){
    console.log("====inside register api=====");
    return fetch(REGISTER_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(register_fields)
    })
    .then(handleApiErrors)
    .then(response=>response.json())
    .catch(errors=>{throw errors})
}

function* registerFlow(register_fields){
    console.log("=========inside register flow=======");
    try{
        yield call(registerAPI,register_fields);
        yield put({type:REGISTER_SUCCESSFUL});
        yield call(history.push,'/');
    }
    catch(error){
        console.log
        yield put({type:REGISTER_ERROR,error})
    }
}
function* registerWatcher(){
    while(true){
        const register_fields=yield take(REGISTER_REQUESTING);
        yield fork(registerFlow,register_fields);
    }
}
export default  registerWatcher;