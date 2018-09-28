import React, { Component } from 'react';
import {Input} from 'reactstrap';


export default class ConnectorSelect extends Component {

  render() {

    return (
      <div>
        <Input type="select" {...this.props}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </Input>
      </div>
    );
  }
}
