import React, { Component } from 'react';

import { FormGroup, Input, Button, Col, Label } from 'reactstrap';

import FldSelect from './FldSelect';
import ValueInput from './ValueInput';



export default class CustomSearchForm extends Component {

  constructor(props) {
    super();
    this.state = {
      fld: props.fld,
      val: props.val,
      strict: props.strict === true
    }


    this.handleSubmit = this.handleSubmit.bind(this);
    this._changeField = this._changeField.bind(this);
    this._changeVal = this._changeVal.bind(this);
    this._changeStrict = this._changeStrict.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props){
      this.setState({
        fld: this.props.fld,
        val: this.props.val,
        strict: this.props.strict ? true : false
      });
    }
  }

  _changeField(v){
    this.setState({
      fld: v.constructor === Object && v.value ? v.value : v
    });
  }
  _changeVal(v){
    this.setState({
      val: v.constructor === Array ? v[0] : v
    });
  }
  _changeStrict(e){
    this.setState({
      strict: e.target.checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.val){
      alert('Insert a value to continue');
      return;
    }
    this.props.onSubmit(this.state.fld, this.state.val, this.state.strict);
  }

  render() {
    return (
      <div className="my-5">
        <form onSubmit={this.handleSubmit} className="form">

          <FormGroup row>

            <Col sm={4}>
              <FldSelect
                  tb={ this.props.tb }
                  fld={this.state.fld}
                  onChange={ this._changeField }
                  />
            </Col>

            <Col sm={5}>
              <ValueInput
                fld={ this.state.fld }
                val={this.state.val}
                onChange={this._changeVal}
               />
            </Col>

            <Col sm={1}>
              <Label check>
                <Input
                    name="strict"
                    type="checkbox"
                    checked={this.state.strict }
                    onChange={this._changeStrict}
                  /> Strict
              </Label>
            </Col>

            <Col sm={2}> <Button type="submit" color="success" block>Search!</Button> </Col>
          </FormGroup>

        </form>
      </div>
    );
  }
}
