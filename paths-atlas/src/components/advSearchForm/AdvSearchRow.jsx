import React, { Component } from 'react';

import { FormGroup, Input, Row, Col, Button } from 'reactstrap';


class AdvSearchRow extends Component {

  showRemove(){
    if (this.props.indexKey > 0) {
      return <Col xs={1}>
        <FormGroup>
          <Button type="button" color="danger" block onClick={ ()=>this.props.onRemove( this.props.indexKey ) }>-</Button>
        </FormGroup>
      </Col>
    }
  }

  showAndOr(){
    if (this.props.indexKey > 0) {
      return <FormGroup>
        <Input type="select" name={ 'adv[' + this.props.indexValue + '][connector]' }>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </Input>
      </FormGroup>
    }
  }

  render() {
    const fields = this.props.fields;

    const operators = [
      {
        'k': 'LIKE',
        'v': 'Contains'
      },
      {
        'k': '=',
        'v': 'Is exactly'},
      {
        'k': 'NOT LIKE',
        'v': 'Does not contain'},
      {
        'k': 'starts_with',
        'v': 'Starts with'},
      {
        'k': 'ends_with',
        'v': 'Ends with'},
      {
        'k': 'is_empty',
        'v': 'Is empty'},
      {
        'k': 'is_not_empty',
        'v': 'Is not empty'},
      {
        'k': '>',
        'v': 'Is bigger than'},
      {
        'k': '<',
        'v': 'Is smaller than'}
    ];
    return (
      <div>
        <Row>

          <Col xs={1}>
            { this.showAndOr() }
          </Col>

          <Col xs={4}>
            <FormGroup>
              <Input type="select" name={ 'adv[' + this.props.indexValue +'][fld]' }>
                {Object.values(fields).map( (f, i) => {
                  return <option key={i} value={f.fullname}>{ f.label }</option>;
                } ) }
              </Input>
            </FormGroup>
          </Col>

          <Col xs={2}>
            <FormGroup>
              <Input type="select" placeholder="select" name={ 'adv[' + this.props.indexValue + '][operator]' }>
                {operators.map( (f, i) => {
                  return <option key={i} value={f.k}>{ f.v }</option>;
                } ) }
              </Input>
            </FormGroup>
          </Col>

          <Col xs={3}>
            <FormGroup>
              <Input type="input" placeholder="Enter value" name={ 'adv[' + this.props.indexValue +'][value]'} autoComplete="off" />
            </FormGroup>
          </Col>

          <Col xs={1}>
            <FormGroup>
              <Button type="button" color="info" block onClick={ ()=>this.props.onAdd() }>+</Button>
            </FormGroup>
          </Col>

          { this.showRemove() }

        </Row>
      </div>
    );
  }
}

export default AdvSearchRow;
