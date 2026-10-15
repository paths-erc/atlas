import React, { Component } from 'react';
import {Input} from 'reactstrap';


export default class OperatorSelect extends Component {

  render() {

    const operators = [
      { k: '_icontains',   v: 'Contains' },
      { k: '_eq',          v: 'Is exactly' },
      { k: '_ncontains',   v: 'Does not contain' },
      { k: '_starts_with', v: 'Starts with' },
      { k: '_ends_with',   v: 'Ends with' },
      { k: '_empty',       v: 'Is empty' },
      { k: '_nempty',      v: 'Is not empty' },
      { k: '_gt',          v: 'Is bigger than' },
      { k: '_lt',          v: 'Is smaller than' },
    ];

    return (
      <div>
        <Input type="select" placeholder="select" {...this.props}>
          {operators.map( (f, i) => {
            return (<option key={i} value={f.k}>{ f.v }</option>);
          } ) }
        </Input>
      </div>
    );
  }
}
