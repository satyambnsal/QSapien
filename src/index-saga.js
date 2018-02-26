import LoginSaga from './components/Login/sagas.js';
import SignupSaga from './components/Signup/sagas.js';
export default function* IndexSaga(){
    yield [
        LoginSaga(),
        SignupSaga()
    ];
}