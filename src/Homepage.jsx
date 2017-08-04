import React, { Component } from 'react';

import { Col } from 'react-bootstrap';

export default class Dashboard extends Component {
  render() {
    return <Col xs={12}>
      <h2>Type driven development demo</h2>
      <ul>
        <li><a href="/#/form">Part 1: Building large objects and refactoring</a></li>
        <li><a href="/#/union">Part 2: Union types and preventing logical errors</a></li>
      </ul>
    </Col>;
  }
}
