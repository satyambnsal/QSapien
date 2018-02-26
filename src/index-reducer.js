import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import client from './components/Client/reducer';
import login from './components/Login/reducer'; 
import signup from './components/Signup/reducer';
var IndexReducer=combineReducers({
    client,
    login,
    signup,
    form
});
export default IndexReducer;