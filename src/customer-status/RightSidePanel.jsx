// @flow
import React, { Component } from 'react';

import { type CustomerStatusMap, type Customer, type CustomerStatus } from 'src/customer-status/customer-status-types';

// $FlowFixMe
import { Panel, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

type RightSidePanelProps = {|
  customerStatusMap: CustomerStatusMap,
  onUpdate: (Customer, CustomerStatus) => void,
|};

export default class RightSidePanel extends Component {
  props: RightSidePanelProps;

  render() {
    return <Panel>
      <Form>
        {
          Array.from(this.props.customerStatusMap)
            .filter(([, status]: [Customer, CustomerStatus]) => status.visible)
            .map(([customer, status]: [Customer, CustomerStatus]) =>
              status.visible
                && <FormGroup key={customer.id}>
                  <ControlLabel>{ customer.fullName }</ControlLabel>
                  <FormControl
                    value={status.displayName}
                    onChange={({ target: { value } }) => this.props.onUpdate(customer, {
                      visible: true,
                      displayName: value,
                    })}
                  />
                </FormGroup>
          )
        }
      </Form>
    </Panel>;
  }
}
