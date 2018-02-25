import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Router } from 'react-router-dom';
import history from './history.js';
import App from './components/App';
import IndexReducer from './index-reducer.js';
import IndexSaga from './index-saga.js';

const sagaMiddleware = createSagaMiddleware();
const composeSetup = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :compose;

const store = createStore(IndexReducer, composeSetup(applyMiddleware(sagaMiddleware)));


sagaMiddleware.run(IndexSaga);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App store={store}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <Router history={history}>
//     <App />
//     </Router>,
//     document.getElementById('root')
// );