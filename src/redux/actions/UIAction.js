
export const ERROR = 'ERROR';
export const OPEN_MESSAGE = 'OPEN_MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';

export const errorOccured = () => {
    return {
        type: ERROR
    }
};

export const openMessage = (message) => {
    return{
        type: OPEN_MESSAGE,
        message: message
    }
};

export const closeMessage = () => {
    return{
        type: CLOSE_MESSAGE
    }
};
