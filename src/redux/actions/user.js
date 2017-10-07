import Auth0Lock from 'auth0-lock';

export const SHOW_LOCK = 'SHOW_LOCK';
export const LOCK_SUCCESS = 'LOCK_SUCCESS';
export const LOCK_ERROR = 'LOCK_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function lockSuccess(profile, token) {
    return {
        type: LOCK_SUCCESS,
        profile
    }
}

function lockError(err) {
    return {
        type: LOCK_ERROR,
        err
    }
}

function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}


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

const lock =  new Auth0Lock(
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
export function doAuthentication() {
    return dispatch => {
        lock.on("authenticated", function(authResult) {
            lock.getProfile(authResult.idToken, function(error, profile) {

                if (error) {
                    // handle error
                    return dispatch(lockError(error))
                }
                localStorage.setItem('profile', JSON.stringify(profile))
                localStorage.setItem('id_token', authResult.idToken)
                return dispatch(lockSuccess(profile))
            });
        });
    }
}

export function doLogout(){
    return dispatch => {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        dispatch(logoutSuccess());
    }
}