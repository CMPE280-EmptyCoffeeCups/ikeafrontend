import {ERROR} from "../actions/UIAction";

export const error = (state = { error: false}, action) => {
    switch (action.type) {
        case ERROR:
            return{
                error: true
            };
        default:
            return state;
    }
};