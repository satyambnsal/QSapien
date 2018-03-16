import {get} from 'axios';
const REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://localhost:3001';
const CHECK_USERNAME_EXIST_URL=`${REACT_APP_API_URL}/user/checkUsernameExist`;


export const checkUsernameExistApi=(username,callback)=>{
get(CHECK_USERNAME_EXIST_URL,{
    params:{
        username
    }
}).then(response=>response.data).then(response=>{
    console.log('response::',response);
    callback(null,response);
}).catch(error=>{
    console.log('error',error);
    callback(error);
})
}