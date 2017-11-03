import Auth0Lock from 'auth0-lock';
import * as API from '../../api/ApiClient';

import {errorOccured} from './UIAction';

export const SHOW_LOCK = 'SHOW_LOCK';
export const LOCK_SUCCESS = 'LOCK_SUCCESS';
export const LOCK_ERROR = 'LOCK_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

const lockSuccess = (profile, token) => {
    return {
        type: LOCK_SUCCESS,
        profile,
        token
    }
};

const lockError = (err) => {
    return {
        type: LOCK_ERROR,
        err
    }
};

const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};

const setProfileData = (profile) => {
    return {
        type: SET_PROFILE_DATA,
        profile
    }
};



const options = {
    theme: {
        logo: './images/desktop/gen/logo.svg',
        primaryColor: '#00319B',
    },
    languageDictionary: {
        emailInputPlaceholder: "something@youremail.com",
        title: ""
    }
};

const lock = new Auth0Lock(
    'e8V4OAn727yXYYJjCw7C7wedgdsSMSLN',
    'gaurav51289.auth0.com',
    options
);

export function showLogin() {
    // display lock widget
    return () => {
        lock.show();
    }
}

// Listen to authenticated event and get the profile of the user
export const doAuthentication = () => {
    return dispatch => {
        lock.on("authenticated", function (authResult) {
            lock.getProfile(authResult.idToken, function (error, profile) {

                if (error) {
                    // handle error
                    return dispatch(lockError(error))
                }

                const profileModified = {
                    fname: profile.given_name ? profile.given_name : '',
                    lname: profile.family_name ? profile.family_name : '',
                    email: profile.email,
                    address: '',
                    paymentMethods: []
                };

                localStorage.setItem('profile', JSON.stringify(profileModified));
                localStorage.setItem('id_token', authResult.idToken);
                return dispatch(lockSuccess(profileModified, authResult.idToken))
            });
        });
    }
};

export const doLogout = () => {
    return dispatch => {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        dispatch(logoutSuccess());
    }
};


export const getUserProfileData = (token, profile) => {
    return (dispatch) => {
        API.getUserProfile(token, profile)
            .then((resJSON) => {
                dispatch(setProfileData(resJSON.profile));
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};


export const updateProfile = (token, profile) => {
    return (dispatch) => {
        API.postUpdateProfile(token, profile)
            .then(() => {
                console.log(profile);
                dispatch(setProfileData(profile));
            })
            .catch((error) => {
                console.error(error);
                dispatch(errorOccured());
            });
    }
};

