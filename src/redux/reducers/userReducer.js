import {
    LOCK_SUCCESS,
    LOGOUT_SUCCESS,
    SET_PROFILE_DATA
} from "../actions/userAction";

const initialState = {
    isAuthenticated: !!localStorage.getItem('id_token'),
    profile: JSON.parse(localStorage.getItem('profile')),
    token: !!localStorage.getItem('id_token')? localStorage.getItem('id_token') : ''
};


const user = (state = initialState, action) => {

    switch (action.type){
        case LOCK_SUCCESS :
            return {
                ...state,
                isAuthenticated: true,
                profile: action.profile,
                token: action.token
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                profile: {},
                token: ''
            };

        case SET_PROFILE_DATA:
            return {
                ...state,
                profile: action.profile
            };

        default :
            return state;

    }
};

export default user;