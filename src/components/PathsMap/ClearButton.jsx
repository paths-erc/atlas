import React, { Component } from 'react';
import { InputGroupAddon, Button } from 'reactstrap';

export default class ListPlaces extends Component {

  render() {
    if (!this.props.show){
      return null;
    }
    return (
      <InputGroupAddon addonType="append">
        <Button color="danger" onClick = { this.props.onClick }>
          <span aria-hidden="true">&times;</span>
        </Button>
      </InputGroupAddon>
    );
  }
}
