import {
    LOGIN_SUCCESS
} from "../actions/index";

import {combineReducers} from 'redux';


const initialState = {
    authenticated: false
};


const user = (state = initialState, action) => {

    const { email, password } = action;

    switch (action.type){
        case LOGIN_SUCCESS :
            return {
                ...state,
                authenticated : true
            };

        default :
            return state;

    }
};

export default combineReducers({
    user
});