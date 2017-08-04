// @flow
import React, { Component } from 'react';

// $FlowFixMe
import { Accordion, Panel, Col } from 'react-bootstrap';

export default class HeaderNote extends Component {
  render() {
    return <Col xs={12}>
      <Accordion defaultActiveKey="2">
        <Panel
          header={<div style={{ cursor: 'pointer' }}>This is part of a flow demonstration</div>}
          eventKey="1"
        >
          See <a href="https://docs.google.com/presentation/d/1TPhPTAPdLWLMqFzM86CSitVQZEiTIBwlOJeThrufrkc/edit?usp=sharing">this presentation</a> for
          a shareable link, and <a href="https://github.com/rbalicki2/type-driven-development">this github repo</a> to follow along with the code.
        </Panel>
      </Accordion>
    </Col>;
  }
}
