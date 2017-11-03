const API = "http://localhost:3001";

const headers = {
    'Accept': 'application/json'
};

export const getUserProfile = (token, profile) => {
    console.log(profile);
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
    return fetch(`${API}/user/updateProfile`, {
        method: 'POST',
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


export const getItems = () => {
    let token = localStorage.getItem('id_token');
    return fetch(`${API}/items/`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`,
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