import React, { Component } from 'react';
import { Router, IndexRoute, Route } from 'react-router'; 

import App from '../App';

class Router extends Component {
  render() {
    return (
      <Router {...this.props}>
        <Route path="/" component={App}>
          <IndexRoute />
        </Route>
      </Router>
    );
  }
}

export default Router;
