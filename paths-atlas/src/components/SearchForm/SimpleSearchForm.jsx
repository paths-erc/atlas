import React, { Component } from 'react';
import { FormGroup, Input, Button, Row, Col } from 'reactstrap';


class SimpleSearchForm extends Component {

  render() {
    return (
      <div>
        <form action={ `${this.props.base}/results/${this.props.tb}/simple` } method="get" id="search_simple" className="form">
          <Row>
            <Col xs={8}>
              <FormGroup>
                <Input type="input" placeholder="Enter value" name="string" autoComplete="off" />
              </FormGroup>
            </Col>
            <Col xs={4}>
              <Button type="submit" color="success" block >Search!</Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default SimpleSearchForm;
