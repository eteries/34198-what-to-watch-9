import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const demoMovie = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  released: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App movie={demoMovie} />
  </React.StrictMode>,
  document.getElementById('root'));
