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
      <FormGroup validationState={this.hasErrorFor('occupation') ? 'error' : null}>
        <ControlLabel>Occupation</ControlLabel>
        <FormControl
          value={this.props.formData.occupation || ''}
          onChange={({ target: { value } }) => this.props.updateFormData({
            occupation: value,
          })}
        />
        {
          this.hasErrorFor('occupation')
            && <HelpBlock>{ this.props.errors.get('occupation') }</HelpBlock>
        }
      </FormGroup>
      <FormGroup validationState={this.hasErrorFor('idealOccupation') ? 'error' : null}>
        <ControlLabel>Ideal Occupation</ControlLabel>
        <FormControl
          value={this.props.formData.idealOccupation || ''}
          onChange={({ target: { value } }) => this.props.updateFormData({
            idealOccupation: value,
          })}
        />
        {
          this.hasErrorFor('idealOccupation')
            && <HelpBlock>{ this.props.errors.get('idealOccupation') }</HelpBlock>
        }
      </FormGroup>
    </div>;
  }
}
