// @flow
import React, { Component } from 'react';
import { type FormState, type FormPageProps, type FormErrors, type Field, type FormData } from 'src/form/form-types';
import { getErrors, makeApiCall } from 'src/form/form-utilities';
import { initialPage } from 'src/form/form-pages';

// $FlowFixMe
import { Col, Form, FormGroup, Button, Panel } from 'react-bootstrap';

export default class OuterForm extends Component {
  state: FormState = {
    currentPage: initialPage,
    data: {
      firstName: '',
      lastName: '',
      occupation: '',
      idealOccupation: '',
    },
    currentPageHasSubmitted: false,
  };

  hasErrors() {
    return this.getErrorsForCurrentPage().size > 0;
  }

  transitionToNextPage() {
    const { currentPage, data } = this.state;
    if (currentPage.nextPage) {
      this.setState({
        currentPage: currentPage.nextPage,
        currentPageHasSubmitted: false,
      });
    } else {
      makeApiCall(data);
    }
  }

  onSubmit() {
    if (!this.hasErrors()) {
      this.transitionToNextPage();
    } else {
      this.setState({
        currentPageHasSubmitted: true,
      });
    }
  }

  getErrorsForCurrentPage(): FormErrors {
    const { data, currentPage } = this.state;
    const errors = getErrors(data);
    return new Map(Array.from(errors)
      .filter(([key]: [Field, string]) => currentPage.visibleFields.includes(key))
    );
  }

  getVisibleErrors(): FormErrors {
    const { currentPageHasSubmitted } = this.state;
    if (currentPageHasSubmitted) {
      // filter the errors to only include the currently visible ones
      return this.getErrorsForCurrentPage();
    }
    return new Map();
  }

  updateFormData(data: FormData) {
    this.setState({
      data: {
        ...this.state.data,
        ...data,
      },
    });
  }

  renderForm() {
    const { data, currentPage } = this.state;
    const PageComponent: ReactClass<FormPageProps> = currentPage.component;
    // Flow has a bug, and the following line is not type-checked
    // However, if you rely on React Router v3, we can type check this.props.children
    // see https://stackoverflow.com/questions/45493423/flow-doesnt-complain-with-incompatible-reactclass-usage-and-jsx
    return <PageComponent
      formData={data}
      updateFormData={newData => this.updateFormData(newData)}
      errors={this.getVisibleErrors()}
    />;
  }

  render() {
    return <Col xs={12}>
      <Panel>
        <Form>
          <FormGroup>
            <h2>Flow Form Demo</h2>
          </FormGroup>
          { this.renderForm() }
          <FormGroup>
            <Button
              bsStyle="primary"
              onClick={() => this.onSubmit()}
            >
              Next
            </Button>
          </FormGroup>
        </Form>
      </Panel>
    </Col>;
  }
}
