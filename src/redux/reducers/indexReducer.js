import {combineReducers} from 'redux';


import user from './userReducer';
import items from './itemsReducer';
import cart from './cartReducer';
import {error} from './UIReducer';


export default combineReducers({
    user,
    items,
    cart,
    error
});