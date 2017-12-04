import {
    UPDATE_ITEMS_DATA,
    MARK_ITMES_IN_CART
} from "../actions/itemsAction";

import {
    ADD_TO_CART,
    REMOVE_ITEM
} from '../actions/cartAction';

const initialState = {
    items: {}
};


const items = (state = initialState, action) => {

    let newItems = {};

    switch (action.type){
        case UPDATE_ITEMS_DATA :

            action.items.forEach((item) => {
                newItems[item._id] = item;
            });

            return {
                ...state,
                items: newItems
            };

        case ADD_TO_CART:
            const itemToCart = action.item;

            return {
                ...state,
                items: {
                    ...state.items,
                    [itemToCart._id]:{
                        ...state.items[itemToCart._id],
                        incart: true
                    }
                }
            };


        case REMOVE_ITEM:
            const itemToRemove = action.item;
            return {
                ...state,
                items: {
                    ...state.items,
                    [itemToRemove._id]:{
                        ...state.items[itemToRemove._id],
                        incart: false
                    }
                }
            };

        case MARK_ITMES_IN_CART:
            const cartItems = action.cartArr;

            let newInitCartState = state.items;

            cartItems.map((item) => {
                newInitCartState[item._id].incart = true;
                return null;
            });

            return {
                items: newInitCartState
            };

        default :
            return state;

    }
};

export default items;