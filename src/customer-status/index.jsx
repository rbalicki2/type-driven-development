// @flow
import React, { Component } from 'react';

import { type CustomerStatusMap, type Customer, type CustomerStatus } from 'src/customer-status/customer-status-types';
import getDefaultCustomerStatusMap from 'src/customer-status/customer-utilities';

// $FlowFixMe
import { Col } from 'react-bootstrap';
import LeftSidePanel from 'src/customer-status/LeftSidePanel';
import RightSidePanel from 'src/customer-status/RightSidePanel';

type CustomerStatusEditorState = {
  customerStatusMap: CustomerStatusMap,
};

export default class CustomerStatusEditor extends Component {
  state: CustomerStatusEditorState = {
    customerStatusMap: getDefaultCustomerStatusMap(),
  };

  updateCustomer(customer: Customer, status: CustomerStatus) {
    // copy the map in order to preserve immutability
    const newMap: CustomerStatusMap = new Map(Array.from(this.state.customerStatusMap));
    newMap.set(customer, status);
    this.setState({
      customerStatusMap: newMap,
    });
  }

  render() {
    return <div>
      <Col xs={12}>
        <h2>Union Types Demo</h2>
      </Col>
      <Col xs={4}>
        <LeftSidePanel
          customerStatusMap={this.state.customerStatusMap}
          onUpdate={(customer: Customer, status: CustomerStatus) =>
            this.updateCustomer(customer, status)
          }
        />
      </Col>
      <Col xs={8}>
        <RightSidePanel
          customerStatusMap={this.state.customerStatusMap}
          onUpdate={(customer: Customer, status: CustomerStatus) =>
            this.updateCustomer(customer, status)
          }
        />
      </Col>
    </div>;
  }
}
