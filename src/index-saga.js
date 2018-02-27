// import {loginWatcher,logoutWatcher} from './components/Login/sagas.js';
// import SignupSaga from './components/Signup/sagas.js';
// export default function* IndexSaga(){
//     yield [
//         loginWatcher(),
//         logoutWatcher(),
//         SignupSaga()
//     ];
// }

import {loginWatcher} from './components/Login/sagas.js';
import SignupSaga from './components/Signup/sagas.js';
export default function* IndexSaga(){
    yield [
        loginWatcher(),
        SignupSaga()
    ];
}