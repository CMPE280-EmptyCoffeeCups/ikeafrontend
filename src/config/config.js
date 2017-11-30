const config = {
    prod: {
        'API': 'https://ikeabackend.herokuapp.com'
    },
    dev: {
        'API': 'http://localhost:3001'
    },
    default: {
        'API': 'https://ikeabackend.herokuapp.com'
    }
};

exports.get = function get(env) {
    return config[env] || config.default;
};