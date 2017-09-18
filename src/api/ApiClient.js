const API = "http://localhost:10010";

const headers = {
    'Accept': 'application/json'
};

export const postDoLogin = (payload) =>
    fetch(`${API}/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
            return error;
    });