import React, { Component } from 'react';
import {Input} from 'reactstrap';


export default class OperatorSelect extends Component {

  render() {

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
        <Input type="select" placeholder="select" {...this.props}>
          {operators.map( (f, i) => {
            return (<option key={i} value={f.k}>{ f.v }</option>);
          } ) }
        </Input>
      </div>
    );
  }
}
