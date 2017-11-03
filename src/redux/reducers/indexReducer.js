import {combineReducers} from 'redux';


import user from './userReducer';
import {error} from './UIReducer';


export default combineReducers({
    user,
    error
});