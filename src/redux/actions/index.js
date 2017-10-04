export const LOGIN_SUCCESS = 'LOGIN_SUCESS';


export function loginSuccess({ email, password}) {
    return {
        type : LOGIN_SUCCESS,
        email,
        password
    }
}

