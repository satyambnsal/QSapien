import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import client from './components/Client/reducer';
import login from './components/Login/reducer'; 
import register from './components/Register/reducer';
var IndexReducer=combineReducers({
    client,
    login,
    register,
    form
});
export default IndexReducer;