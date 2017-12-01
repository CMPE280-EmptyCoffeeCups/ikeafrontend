import {
    ADD_TO_CART,
    REMOVE_ITEM, UPDATE_QTY
} from "../actions/cartAction";

const initialState = {
    cartItems: []
};


const cart = (state = initialState, action) => {

    let cartItems = state.cartItems;

    switch (action.type){

        case ADD_TO_CART :

            const newItem = action.item;

            newItem.qty = 1;
            cartItems.push(newItem);

            return {
                ...state,
                cartItems
            };

        case REMOVE_ITEM:
            return {
                ...state,
                 cartItems : cartItems.filter((cartItem) => (cartItem._id !== action.itemId))
            };

        case UPDATE_QTY:
            const updateItem = action.item;
            const qty = action.qty;

            let newCartItems = [];

            cartItems.forEach((item, index) => {
                if(item._id === updateItem._id){
                    item.qty = qty;
                }
                newCartItems.push(item);
            });
            return {
                ...state,
                cartItems: newCartItems
            };

        default :
            return state;

    }
};

export default cart;