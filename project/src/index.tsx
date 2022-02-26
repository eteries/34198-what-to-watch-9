import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { FILMS } from './mocks/films';
import { REVIEWS } from './mocks/reviews';

ReactDOM.render(
  <React.StrictMode>
    <App films={FILMS} reviews={REVIEWS}/>
  </React.StrictMode>,
  document.getElementById('root'));
