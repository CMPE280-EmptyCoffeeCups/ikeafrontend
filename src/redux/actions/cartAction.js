
import * as API from '../../api/ApiClient';

import {errorOccured} from './UIAction';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_QTY = 'UPDATE_QTY';

const addToCart = (item) => {
    return {
        type: ADD_TO_CART,
        item
    }
};

const removeItem = (item) => {
    return {
        type: REMOVE_ITEM,
        item
    }
};

const updateQty = (item, qty) => {
    return {
        type: UPDATE_QTY,
        item,
        qty
    }
};

export const addItemToCart = (profile, item) => {
    return (dispatch) => {

        API.addItemToCart(profile, item)
            .then((resJSON) => {
                dispatch(addToCart(item));
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const removeItemFromCart = (profile, item) => {
    return (dispatch) => {
        API.removeItemFromCart(profile, item)
            .then((resJSON) => {
                dispatch(removeItem(item));
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const updateQtyOfCartItem = (item, qty) => {
    return (dispatch) => {
        // API.getAllItems()
        //     .then((resJSON) => {
        //         dispatch(addToCart(item));
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         dispatch(errorOccured());
        //     });
        dispatch(updateQty(item, qty))
    }
};


