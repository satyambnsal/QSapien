import {io} from '../server';

io.on('connection',(socket)=>{
    console.log('connection is open');
    socket.on('sendChallenge',(values)=>{
        console.log('------------values--------');
        console.log(JSON.stringify(values));
    })
})