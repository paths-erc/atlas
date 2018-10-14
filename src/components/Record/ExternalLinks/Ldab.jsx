import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Ldab extends Component {

  render() {
    if ( this.props.tb !== 'manuscripts' || !this.props.data.val || this.props.data.val.length < 1 ) {
      return null;
    }
    return <ListGroupItem>
      <a href={"https://www.trismegistos.org/ldab/text.php?quick=" + this.props.data.val } target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon="external-link-alt" /> Leuven Database of Ancient books
      </a>
    </ListGroupItem>
  }
}
