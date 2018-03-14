import {loginWatcher} from './components/Login/sagas.js';
import SignupSaga from './components/Signup/sagas.js';
import PortalSaga from './components/Portal/sagas';
import ChallengeSaga from './components/Portal/PortalContent/Home/sagas';
console.log('login watcher',loginWatcher);
export default function* IndexSaga() {
    yield [
        loginWatcher(),
        SignupSaga(),
        PortalSaga(),
        ChallengeSaga()
    ];
}