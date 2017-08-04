// @flow
import React, { Component } from 'react';

// $FlowFixMe
import { HashRouter, Route } from 'react-router-dom';
import Form from 'src/form';
import CustomerStatus from 'src/customer-status';
import HeaderNote from 'src/HeaderNote';
import Homepage from 'src/Homepage';

export default class Routes extends Component {
  render() {
    return <HashRouter>
      <div>
        <HeaderNote />
        <Route path="/form" component={Form} />
        <Route path="/union" component={CustomerStatus} />
        <Route exact path="/" component={Homepage} />
      </div>
    </HashRouter>;
  }
}
