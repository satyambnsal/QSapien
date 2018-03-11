import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {Router } from 'react-router-dom';
import history from './history.js';
import App from './components/App';
import IndexReducer from './index-reducer.js';
import IndexSaga from './index-saga.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import './stylesheets/style.css'
const sagaMiddleware = createSagaMiddleware();

const store = createStore(IndexReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));


sagaMiddleware.run(IndexSaga);
ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
            <App store={store} />
            </Router>    
        </Provider>,
    document.getElementById('root')
);
