import socket from 'socket.io-client';
// import logger from 'winston';
const REACT_APP_API_URL=process.env.REACT_APP_API_URL||'httpL//localhost:3001'
let client=socket(REACT_APP_API_URL);

export function sendChallengeSocketApi({values}){
// logger.info('inside send challenge socket api');
console.log('inside send challenge socket api');
client.emit('sendChallenge',values);
return;
}