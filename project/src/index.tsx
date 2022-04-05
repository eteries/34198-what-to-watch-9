import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app';
import { store } from './store';
import { checkAuthAction, fetchFilmsAction } from './store/async-actions';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer limit={1} />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
