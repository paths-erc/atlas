import React, { Component } from 'react';

import { CardBody } from 'reactstrap';

export default class Caption extends Component {
  render(){
    const { text, attribution } = this.props;
    if (!text && !attribution){
      return null;
    }
    return (
      <CardBody className="text-secondary" style={{ fontSize: '.9rem' }}>
        { text && <div style={{ fontStyle: 'italic' }}>{ text }</div> }
        { attribution && <div className="small mt-1">{ attribution }</div> }
      </CardBody>
    );
  }
}
