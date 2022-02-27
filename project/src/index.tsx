import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { FILMS } from './mocks/films';

ReactDOM.render(
  <React.StrictMode>
    <App films={FILMS} />
  </React.StrictMode>,
  document.getElementById('root'));
