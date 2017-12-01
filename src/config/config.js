const config = {
    prod: {
        'API': 'https://ikeabackend.herokuapp.com',
        'IMAGE_CDN': 'http://res.cloudinary.com/gc51289/image/fetch/https://ikeabackend.herokuapp.com/static'
    },
    dev: {
        'API': 'http://localhost:3001',
        'IMAGE_CDN': 'http://res.cloudinary.com/gc51289/image/fetch/https://ikeabackend.herokuapp.com/static'
    },
    default: {
        'API': 'https://ikeabackend.herokuapp.com',
        'IMAGE_CDN': 'http://res.cloudinary.com/gc51289/image/fetch/https://ikeabackend.herokuapp.com/static'
    }
};

exports.get = function get(env) {
    return config[env] || config.default;
};