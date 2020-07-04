import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import HomePage from './HomePage';
import TickerList from './TickerList';
import Login from './auth/Login';
import Register from './auth/Register';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/Register" component={Register} />
            <Route path="/bfxapi" component={TickerList} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
