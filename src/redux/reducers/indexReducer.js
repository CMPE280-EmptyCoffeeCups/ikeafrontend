import {combineReducers} from 'redux';


import user from './userReducer';
import items from './itemsReducer';
import {error} from './UIReducer';


export default combineReducers({
    user,
    items,
    error
});