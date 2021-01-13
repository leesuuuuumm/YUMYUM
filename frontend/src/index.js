import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import reducer from './_reducers';

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider 
      store = {createStoreWidthMiddleware(
        // 리듀서
        reducer,
        // 개발자 도구
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
