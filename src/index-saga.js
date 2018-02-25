import LoginSaga from './components/Login/sagas.js';
import RegisterSaga from './components/Register/sagas.js';
export default function* IndexSaga(){
    yield [
        LoginSaga(),
        RegisterSaga()
    ];
}