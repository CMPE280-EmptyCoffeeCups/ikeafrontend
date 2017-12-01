import {
    UPDATE_ITEMS_DATA
} from "../actions/itemsAction";

import{
    ADD_TO_CART,
    REMOVE_ITEM
} from '../actions/cartAction';

const initialState = {
    items: []
};


const items = (state = initialState, action) => {

    let newItems;

    switch (action.type){
        case UPDATE_ITEMS_DATA :
            return {
                ...state,
                items: action.items
            };

        case ADD_TO_CART:
            const itemToCart = action.item;

            newItems = state.items.map((item) => {
                if(item._id === itemToCart._id){
                    return {
                        ...item,
                        incart: true
                    }
                }
                return item;
            });

            return {
                ...state,
                items: newItems
            };


        case REMOVE_ITEM:
            const itemToRemove = action.item;
            newItems = state.items.map((item) => {
                if(item._id === itemToRemove._id){
                    return {
                        ...item,
                        incart: false
                    }
                }
                return item;
            });

            return {
                ...state,
                items: newItems
            };

        default :
            return state;

    }
};

export default items;