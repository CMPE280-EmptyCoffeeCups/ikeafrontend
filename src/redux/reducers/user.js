import {LOCK_SUCCESS, LOGOUT_SUCCESS} from "../actions/user";

const initialState = {
    isAuthenticated: !!localStorage.getItem('id_token'),
    profile: localStorage.getItem('profile')
};


const user = (state = initialState, action) => {

    switch (action.type){
        case LOCK_SUCCESS :
            return {
                ...state,
                isAuthenticated: true,
                profile: JSON.stringify(action.profile)
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                profile: ''
            };

        default :
            return state;

    }
};

export default user;