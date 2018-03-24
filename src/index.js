import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import { applyMiddleware, createStore} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {BrowserRouter } from 'react-router-dom';
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
            <BrowserRouter>
           <Route path='/' render={()=><App store={store} />}/>
            </BrowserRouter>    
        </Provider>,
    document.getElementById('root')
);
