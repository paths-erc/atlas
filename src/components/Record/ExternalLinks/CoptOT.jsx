import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class CoptOT extends Component {

  render() {
    if ( this.props.tb !== 'manuscripts' || !this.props.data.val || this.props.data.val.length < 1 ) {
      return null;
    }
    return <ListGroupItem>
      <a href={"http://coptot.manuscriptroom.com/manuscript-catalog/?gaNum=" + encodeURIComponent(this.props.data.val)} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon="external-link-alt" /> The Digital Edition of the Coptic Old Testament
      </a>
    </ListGroupItem>
  }
}
