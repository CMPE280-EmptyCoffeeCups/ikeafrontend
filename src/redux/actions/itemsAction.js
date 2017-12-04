
import * as API from '../../api/ApiClient';

import {errorOccured} from './UIAction';

export const UPDATE_ITEMS_DATA = 'UPDATE_ITEMS_DATA';
export const MARK_ITMES_IN_CART = 'MARK_ITEMS_IN_CART';
export const DO_SEARCH = 'DO_SEARCH';

const updateItemsData = (items) => {
    return {
        type: UPDATE_ITEMS_DATA,
        items
    }
};

export const markItemsInCart = (cartArr) => {
    return {
        type: MARK_ITMES_IN_CART,
        cartArr
    }
};

export const doSearch = (searched) => {
    return {
        type: DO_SEARCH,
        searched
    }
};


export const getAllItems = () => {
    return (dispatch) => {
        API.getAllItems()
            .then((resJSON) => {
                dispatch(updateItemsData(resJSON.items));
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};


