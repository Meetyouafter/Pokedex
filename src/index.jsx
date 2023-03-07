import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles.scss';
import './reset.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <App />,
);
