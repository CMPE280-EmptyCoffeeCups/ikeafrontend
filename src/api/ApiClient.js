import * as getConfig from '../config/config';

export const API = getConfig.get('prod').API;

const headers = {
    'Accept': 'application/json'
};

export const getUserProfile = (token, profile) => {
    return fetch(`${API}/user/authenticate`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`,
            "cache-control": "no-cache"
        },
        body: JSON.stringify(profile)
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};

export const postUpdateProfile = (token, profile) => {
    return fetch(`${API}/user/profile`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`,
            "cache-control": "no-cache"
        },
        body: JSON.stringify(profile)
    }).then(res => {
        if (res.status !== 200) {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};

export const deleteProfile = (token, email) => {
    return fetch(`${API}/user/profile/${email}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`,
            "cache-control": "no-cache"
        },
    }).then(res => {
        if (res.status !== 200) {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};


export const getAllItems = () => {
    return fetch(`${API}/items/`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "cache-control": "no-cache"
        }
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw Error(res.status + " : " + res.statusText);
        }
    }).catch(error => {
        console.log(error);
        return error;
    });
};


export const initCart = (profile) => {
    return fetch(`${API}/cart/getcart`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "cache-control": "no-cache"
        },
        body: JSON.stringify({
            profile
        })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};

export const addItemToCart = (profile, item) => {
    return fetch(`${API}/cart/add`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "cache-control": "no-cache"
        },
        body: JSON.stringify({
            profile,
            item
        })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};

export const removeItemFromCart = (profile, item) => {
    return fetch(`${API}/cart/remove`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "cache-control": "no-cache"
        },
        body: JSON.stringify({
            profile,
            item
        })
    }).then(res => {
        if (res.status !== 200) {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};

export const updateQtyOfCartItem = (profile, item, qty) => {
    return fetch(`${API}/cart/update`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "cache-control": "no-cache"
        },
        body: JSON.stringify({
            profile,
            item,
            qty
        })
    }).then(res => {
        if (res.status !== 200) {
            throw Error(res.status + " : " + res.statusText);
        }
    });
};