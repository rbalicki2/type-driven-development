// @flow

import React from 'react';
import { render } from 'react-dom';

// $FlowFixMe
import 'bootstrap/dist/css/bootstrap.css';
// $FlowFixMe
import { Grid, Row } from 'react-bootstrap';
import Routes from 'src/Routes';

// $FlowFixMe
import 'src/main.scss';

render(<Grid><Row><Routes /></Row></Grid>,
  document.getElementById('app'));
