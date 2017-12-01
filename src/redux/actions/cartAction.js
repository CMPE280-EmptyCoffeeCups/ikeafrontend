
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

const removeItem = (itemId) => {
    return {
        type: REMOVE_ITEM,
        itemId
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
                console.log(resJSON);
                dispatch(addToCart(item));
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

export const removeItemFromCart = (profile, itemId) => {
    return (dispatch) => {
        API.removeItemFromCart(profile, itemId)
            .then((resJSON) => {
                dispatch(removeItem(itemId));
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


