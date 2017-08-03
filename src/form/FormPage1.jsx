// @flow
import React, { Component } from 'react';

// $FlowFixMe
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import { type FormPageProps, type Field } from 'src/form/form-types';

export default class FormPage1 extends Component {
  props: FormPageProps;

  hasErrorFor(key: Field) {
    return !!this.props.errors.get(key);
  }

  render() {
    return <div>
      <FormGroup validationState={this.hasErrorFor('firstName') ? 'error' : null}>
        <ControlLabel>First Name</ControlLabel>
        <FormControl
          value={this.props.formData.firstName || ''}
          onChange={({ target: { value } }) => this.props.updateFormData({
            firstName: value,
          })}
        />
        {
          this.hasErrorFor('firstName')
            && <HelpBlock>{ this.props.errors.get('firstName') }</HelpBlock>
        }
      </FormGroup>
      <FormGroup validationState={this.hasErrorFor('lastName') ? 'error' : null}>
        <ControlLabel>Last Name</ControlLabel>
        <FormControl
          value={this.props.formData.lastName || ''}
          onChange={({ target: { value } }) => this.props.updateFormData({
            lastName: value,
          })}
        />
        {
          this.hasErrorFor('lastName')
            && <HelpBlock>{ this.props.errors.get('lastName') }</HelpBlock>
        }
      </FormGroup>
    </div>;
  }
}
