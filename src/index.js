import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from './redux/reducers/indexReducer';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import {BrowserRouter} from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    ,
    rootElement);

