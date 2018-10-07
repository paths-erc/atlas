import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Pleiades extends Component {

  render() {
    if ( this.props.tb !== 'places' || !this.props.data.val || this.props.data.val.length < 1 ) {
      return null;
    }
    return <ListGroupItem>
      <a href={"https://pleiades.stoa.org/places/" + this.props.data.val } target="_blank">
        <FontAwesomeIcon icon="external-link-alt" /> Pleiades
      </a>
    </ListGroupItem>
  }
}
