import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, Input, Button, Col, Label } from 'reactstrap';
import Select from 'react-select';

import ValueInput from './ValueInput';



export default class CustomSearchForm extends Component {

  constructor(props) {
    super();
    const flds = Object.keys(props.fields).map(key => {
      return { value: props.fields[key].fullname, label: props.fields[key].label };
    });

    this.state = {
      search: false,
      fields: flds,
      selectedFld: flds[0],
      selectedVal: false,
      selectedOp: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this._changeField = this._changeField.bind(this);
    this._changeVal = this._changeVal.bind(this);
    this._changeOp = this._changeOp.bind(this);
  }

  _changeField(v){
    this.setState({
      selectedFld: v
    });
  }
  _changeVal(v){
    this.setState({
      selectedVal: v.constructor === Array ? v[0] : v
    });
  }
  _changeOp(e){
    this.setState({
      selectedOp: e.target.checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let search = encodeURIComponent('adv[aa][fld]')             + "=" + encodeURIComponent(this.state.selectedFld.value) +
                  "&" + encodeURIComponent('adv[aa][operator]') + "=" + encodeURIComponent(this.state.selectedOp ? "=" : "LIKE") +
                  "&" + encodeURIComponent('adv[aa][value]')    + "=" + encodeURIComponent(this.state.selectedVal);

    this.setState({ search: search });
  }

  render() {

    if (this.state.search){
      return <Redirect to={{
            pathname: "/results/" + this.props.tb + "/adv",
            search: this.state.search
          }} />
    }
    if (!this.state.fields){
      return null;
    }

    return (
      <div className="my-5">
        <form onSubmit={this.handleSubmit} className="form">

          <FormGroup row>

            <Col sm={4}>
              <Select
                  name="fld"
                  defaultValue={ this.state.selectedFld }
                  options={ this.state.fields }
                  onChange={ this._changeField }
                  />
            </Col>

            <Col sm={5}>
              <ValueInput fld={ this.state.selectedFld } onChange={this._changeVal} />
            </Col>

            <Col sm={1}> <Label><Input name="strict" type="checkbox" onChange={this._changeOp} /> Strict</Label> </Col>

            <Col sm={2}> <Button type="submit" color="success" block>Search!</Button> </Col>
          </FormGroup>

        </form>
      </div>
    );
  }
}
