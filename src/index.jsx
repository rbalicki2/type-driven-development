// @flow

import React from 'react';
import { render } from 'react-dom';

// $FlowFixMe
import 'bootstrap/dist/css/bootstrap.css';
// $FlowFixMe
import { Grid, Row, Col } from 'react-bootstrap';
import Routes from 'src/Routes';

render(<Grid><Row><Col xs={12}><Routes /></Col></Row></Grid>,
  document.getElementById('app'));
