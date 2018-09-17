import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, Input, Button, Col, Label } from 'reactstrap';
import Select from 'react-select';

export default class CustomSearchForm extends Component {

  constructor() {
    super();
    this.state = {
      search: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const fld = data.get('fld');
    const value = data.get('value');
    const strict = data.get('strict');

    let search = encodeURIComponent('adv[aa][fld]')             + "=" + encodeURIComponent(fld) +
                  "&" + encodeURIComponent('adv[aa][operator]') + "=" + encodeURIComponent( strict === null ? "LIKE" : "=") +
                  "&" + encodeURIComponent('adv[aa][value]')    + "=" + encodeURIComponent(value);

    this.setState({ search: search });
  }

  render() {

    let fields = Object.keys(this.props.fields).map(key => {
      return { value: this.props.fields[key].fullname, label: this.props.fields[key].label };
    });

    if (this.state.search){
      return <Redirect to={{
            pathname: "/results/" + this.props.tb + "/adv",
            search: this.state.search
          }} />
    }

    return (
      <div className="my-5">
        <form onSubmit={this.handleSubmit} className="form">

          <FormGroup row>

            <Col sm={4}>
              <Select
                  name="fld"
                  defaultValue={ fields[0] }
                  options={ fields }
                  />
            </Col>

            <Col sm={5}> <Input name="value" type="input" required  autoComplete="off" /> </Col>

            <Col sm={1}> <Label><Input name="strict" type="checkbox"/> Strict</Label> </Col>

            <Col sm={2}> <Button type="submit" color="success" block>Search!</Button> </Col>
          </FormGroup>

        </form>
      </div>
    );
  }
}
