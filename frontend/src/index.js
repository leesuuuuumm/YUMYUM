import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import reducer from './_reducers';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import forceScreenSize from './forceScreenSize'

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);


ReactDOM.render(
  <React.StrictMode>
    {/* // 스토어 데이터 공급자 */}
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
reportWebVitals();
forceScreenSize(414, 736)    