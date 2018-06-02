import React, { Component } from 'react';

import { FormGroup, Input, Row, Col, Button } from 'reactstrap';

import Database from '../services/database/database';
import PreviewFlds from '../services/previewFlds/previewFlds';

import SubHead from '../subHead/subHead';



class AdvSearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tb: null,
      fields: null
    };
  }

  componentDidMount(){
    const tb = this.props.match.params.table;

    Database.inspect(tb, data => {
      this.setState({ fields: data });
      this.setState({ tb: tb });
    });
  }

  render() {
    if (! this.state.fields) {
      return <div>Loading... </div>;
    }

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
        <SubHead tb={ this.state.tb } tblabel={ PreviewFlds.get(this.state.tb).label } text="Advanced search" />


      	<div className="mt-3 container">
          <form action={'/results/' + this.state.tb + '/adv'} method="get" id="searchTitles" className="form">
            <Row>
              <Col xs={4}>
                <FormGroup>
                  <Input type="select" name="adv[aa][fld]">
                    {this.state.fields.map( (f, i) => {
                      return <option key={i} value={f.fullname}>{ f.label }</option>;
                    } ) }
                  </Input>
                </FormGroup>
              </Col>

              <Col xs={2}>
                <FormGroup>
                  <Input type="select" placeholder="select" name="adv[aa][operator]">
                    {operators.map( (f, i) => {
                      return <option key={i} value={f.k}>{ f.v }</option>;
                    } ) }
                  </Input>
                </FormGroup>
              </Col>

              <Col xs={4}>
                <FormGroup>
                  <Input type="input" placeholder="Enter value" name="adv[aa][value]" />
                </FormGroup>
              </Col>

              <Col xs={1}>
                <FormGroup>
                  <Button type="button" color="info" block>AND</Button>
                </FormGroup>
              </Col>

              <Col xs={1}>
                <FormGroup>
                  <Button type="button" color="info" block>OR</Button>
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="success" block>Search!</Button>
          </form>
          <hr />
  		  </div>
      </div>
    );
  }
}

export default AdvSearchForm;
