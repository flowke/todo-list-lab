import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import configureStore from './store/configureStore';
import {
  Provider,
} from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </Provider>

  , document.getElementById('root'));
