import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import BaseApp from './byBase';

import './index.css';


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={BaseApp}/>
    </Switch>
  </Router>

  , document.getElementById('root'));


registerServiceWorker();


if (module.hot){
    module.hot.accept()
}
