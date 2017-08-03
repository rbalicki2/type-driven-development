// @flow
import React, { Component } from 'react';

import { type CustomerStatusMap, type Customer, type CustomerStatus } from 'src/customer-status/customer-status-types';

// $FlowFixMe
import { Panel, Form, FormGroup, Checkbox } from 'react-bootstrap';

type LeftSidePanelProps = {|
  customerStatusMap: CustomerStatusMap,
  onUpdate: (Customer, CustomerStatus) => void,
|};

export default class LeftSidePanel extends Component {
  props: LeftSidePanelProps;

  render() {
    return <Panel>
      <Form>
        {
          Array.from(this.props.customerStatusMap)
            .map(([customer, status]: [Customer, CustomerStatus]) =>
              <FormGroup key={customer.id}>
                <Checkbox
                  checked={status.visible}
                  onChange={() => this.props.onUpdate(customer, status.visible
                    ? { visible: false }
                    : { visible: true, displayName: '' }
                  )}
                >
                  { customer.fullName }
                </Checkbox>
              </FormGroup>
          )
        }
      </Form>
    </Panel>;
  }
}
