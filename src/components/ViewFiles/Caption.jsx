import React, { Component } from 'react';

import { CardBody } from 'reactstrap';

export default class Caption extends Component {
  render(){
    if (!this.props.text){
      return null;
    }
    return (<CardBody className="text-secondary" style={{ fontSize: '.9rem', fontStyle: 'italic'}}>{this.props.text}</CardBody>);
  }
}
