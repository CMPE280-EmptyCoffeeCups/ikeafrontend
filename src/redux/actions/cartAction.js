
import * as API from '../../api/ApiClient';

import {errorOccured, openMessage} from './UIAction';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_QTY = 'UPDATE_QTY';
export const INIT_CART = 'INIT_CART';
export const CREATE_ORDER = 'CREATE_ORDER';

const initiateCart = (cartArr) => {
    return {
        type: INIT_CART,
        cartArr
    }
};

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

const createOrder = (order) => {
    return {
        type: CREATE_ORDER,
        order
    }
};

export const initCart = (profile) => {
    return (dispatch) => {
        API.initCart(profile)
            .then((resJSON) => {
                resJSON.cart && dispatch(initiateCart(resJSON.cart.CART_PRODUCTS));
            })
            .catch((error) => {
                console.log(error);
                dispatch(errorOccured());
            });
    }
};

export const addItemToCart = (profile, item) => {
    return (dispatch) => {

        API.addItemToCart(profile, item)
            .then((resJSON) => {
                dispatch(addToCart(item));
                dispatch(openMessage('Item added to cart.'));
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

export const updateQtyOfCartItem = (profile, item, qty) => {
    return (dispatch) => {
        API.updateQtyOfCartItem(profile, item, qty)
            .then((resJSON) => {
                console.log(resJSON);
                dispatch(updateQty(item, qty));
            })
            .catch((error) => {
                console.log(error);
                dispatch(errorOccured());
            });
    }
};


export const confirmPurchase = (profile, order) => {
    return (dispatch) => {
        API.confirmPurchase(profile, order)
            .then((resJSON) => {
                dispatch(createOrder(order));
            })
            .catch((error) => {
                console.log(error);
                dispatch(errorOccured());
            });
    }
};


