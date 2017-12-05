import {ERROR, OPEN_MESSAGE, CLOSE_MESSAGE} from "../actions/UIAction";

export const uidata = (state = { error: false, message: { open: false, message: ''}}, action) => {
    switch (action.type) {
        case ERROR:
            return{
                ...state,
                error: true
            };

        case OPEN_MESSAGE:
            return{
                ...state,
                message: {
                    open: true,
                    message: action.message
                }
            };

        case CLOSE_MESSAGE:
            return{
                ...state,
                message: {
                    open: false,
                    message: ''
                }
            };
        default:
            return state;
    }
};