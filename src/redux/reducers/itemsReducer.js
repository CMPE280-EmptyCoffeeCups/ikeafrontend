import {
    UPDATE_ITEMS_DATA
} from "../actions/itemsAction";

const initialState = {
    items: []
};


const items = (state = initialState, action) => {

    switch (action.type){
        case UPDATE_ITEMS_DATA :
            return {
                ...state,
                items: action.items
            };

        default :
            return state;

    }
};

export default items;