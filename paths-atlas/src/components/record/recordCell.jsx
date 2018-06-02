import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';



class RecordCell extends Component {

  render() {
    const val = this.props.val;
    const label = this.props.label;
    const coptic = this.props.coptic;

    return (
      <Row className="border-bottom mt-2 mb-2 pb-1">
        <Col sm="4" md="3">
          <label className="font-weight-bold">{label}</label>
        </Col>
        <Col>
          <div className={ coptic ? 'coptic': undefined }>
            {val}
          </div>
        </Col>
	    </Row>
    );
  }
}

export default RecordCell;
