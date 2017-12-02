import {
    ADD_TO_CART,
    REMOVE_ITEM,
    UPDATE_QTY,
    INIT_CART
} from "../actions/cartAction";

const initialState = {
    cartItems: [],
    subtotal: 0
};


const cart = (state = initialState, action) => {

    let cartItems = state.cartItems;

    switch (action.type){

        case INIT_CART:

            let initArr = action.cartArr.map((item) => {
                item.itemTotal = item.PRICE * item.qty;
                return item;
            });

            console.log(initArr);

            return{
                ...state,
                cartItems: initArr,
                subtotal: initArr.reduce((st, item) => {
                    return st + item.itemTotal;
                }, 0).toFixed(2)
            };
        case ADD_TO_CART :

            let newItem = action.item;
            newItem.itemTotal = newItem.PRICE;

            newItem.qty = 1;
            cartItems.push(newItem);

            // newST = cartItems.reduce((st, item) => {
            //     console.log(st);
            //     console.log(item);
            //     return st + item.itemTotal;
            // });

            return {
                ...state,
                cartItems,
                subtotal: cartItems.reduce((st, item) => {
                    return st + item.itemTotal;
                }, 0).toFixed(2)
            };

        case REMOVE_ITEM:
            const removeItem = action.item;

            let newCartItemsRemove = cartItems.filter((cartItem) => (cartItem._id !== removeItem._id));

            return {
                ...state,
                cartItems: newCartItemsRemove,
                subtotal: newCartItemsRemove.reduce((st, item) => {
                    return st + item.itemTotal;
                }, 0).toFixed(2)
            };

        case UPDATE_QTY:
            const updateItem = action.item;
            const updateQty = action.qty;
            const updatePrice = updateItem.PRICE;
            const updateItemTotal = updatePrice * updateQty;


            let newCartItemsUpdated = [];

            cartItems.forEach((item) => {
                if(item._id === updateItem._id){
                    item.qty = updateQty;
                    item.itemTotal = updateItemTotal;
                }
                newCartItemsUpdated.push(item);
            });

            return {
                ...state,
                cartItems: newCartItemsUpdated,
                subtotal: newCartItemsUpdated.reduce((st, item) => {
                    return st + item.itemTotal;
                }, 0).toFixed(2)
            };

        default :
            return state;

    }
};

export default cart;