// @flow
import React, { Component } from 'react';

// $FlowFixMe
import { HashRouter, Route } from 'react-router-dom';
import Form from 'src/form';

export default class Routes extends Component {
  render() {
    return <HashRouter>
      <div>
        <Route path="/form" component={Form} />
      </div>
    </HashRouter>;
  }
}
