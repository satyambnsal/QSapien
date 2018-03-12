import { handleApiErrors } from '../../../../../lib/api-errors';
import axios from 'axios';
let REACT_APP_API_URL=process.env.REACT_APP_API_URL||'http://localhost:3001';
const GET_CHALLENGES_URL = `${REACT_APP_API_URL}/user/getChallenges`;

export const fetchChallenges= async (userId,cb)=>{
    console.log('--------user-id:: fetch challenge api'+userId);
//    userId+="a";
try{
    const challenges=await axios.post(GET_CHALLENGES_URL,JSON.stringify({userId}),{
        headers:{
            'Content-Type':'application/json'
        }
    })
    const challengesData=JSON.parse(JSON.stringify(challenges.data));
    console.log('--------challenge data------',challengesData);
    cb(challengesData);
}
catch(error){
    console.log('error::'+JSON.stringify(error));
    console.log('error occured while fetching challenges');
    cb([]);
}
}