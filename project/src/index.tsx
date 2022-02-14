import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const demofilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  released: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App film={demofilm} />
  </React.StrictMode>,
  document.getElementById('root'));
