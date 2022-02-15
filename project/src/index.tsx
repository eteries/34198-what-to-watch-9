import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const demoFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  released: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App film={demoFilm} />
  </React.StrictMode>,
  document.getElementById('root'));
