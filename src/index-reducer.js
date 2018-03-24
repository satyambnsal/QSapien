import {combineReducers} from 'redux';
import client from './components/Client/reducer';
import login from './components/Login/reducer'; 
import signup from './components/Signup/reducer';
import portal from './components/Portal/reducer';
var IndexReducer=combineReducers({
    client,
    login,
    signup,
    portal
});
export default IndexReducer;