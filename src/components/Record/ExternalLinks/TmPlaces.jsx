import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class TmPlaces extends Component {

  render() {
    if ( this.props.tb !== 'places' || !this.props.data.val || this.props.data.val.length < 1 ) {
      return null;
    }
    return <ListGroupItem>
      <a href={"https://www.trismegistos.org/place/" + this.props.data.val } target="_blank">
        <FontAwesomeIcon icon="external-link-alt" /> Trismegistos places
      </a>
    </ListGroupItem>
  }
}
