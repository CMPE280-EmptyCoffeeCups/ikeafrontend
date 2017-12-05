import {combineReducers} from 'redux';


import user from './userReducer';
import items from './itemsReducer';
import cart from './cartReducer';
import {uidata} from './UIReducer';


export default combineReducers({
    user,
    items,
    cart,
    uidata
});