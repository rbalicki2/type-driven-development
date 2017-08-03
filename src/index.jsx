// @flow

import React from 'react';
import { render } from 'react-dom';

// $FlowFixMe
import 'bootstrap/dist/css/bootstrap.css';
// $FlowFixMe
import { Grid, Row } from 'react-bootstrap';
import Routes from 'src/Routes';

render(<Grid><Row><Routes /></Row></Grid>,
  document.getElementById('app'));
