import {loginWatcher} from './components/Login/sagas.js';
import SignupSaga from './components/Signup/sagas.js';
import {contactRequestWatcher} from './components/Portal/sagas';
export default function* IndexSaga(){
    yield [
        loginWatcher(),
        SignupSaga(),
        contactRequestWatcher()
    ];
}