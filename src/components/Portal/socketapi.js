import socket from 'socket.io-client';
// import logger from 'winston';
let client=socket('http://127.0.0.1:3001');

export function sendChallengeSocketApi(values){
// logger.info('inside send challenge socket api');
console.log('inside send challenge socket api');
client.emit('sendChallenge',values);
return;
}