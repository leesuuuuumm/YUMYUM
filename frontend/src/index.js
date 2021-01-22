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
import SearchAppBar from './components/common/SearchAppBar';
import * as serviceWorker from './serviceWorker';

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

// const customMiddleware = store => nextRunner => action => {
//   console.log('액션객체', action);
//   console.log('리듀서 실행 전', store.getStore());
//   const result = nextRunner(action);
//   console.log('리듀서 실행 후', store.getStore());

//   return result;

// }

// const mystore = createStore(
//   reducer,
//   applyMiddleware(customMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )


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
      {/* <Provider store={this.mystore}> */}
    {/* <SearchAppBar /> */}
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();