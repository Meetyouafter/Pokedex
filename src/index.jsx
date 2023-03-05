import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './components/App.jsx';
import './styles.scss';
import './reset.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
<Provider store={store}>
<App />
</Provider>);