import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function CoptOT (props) {

  if ( props.tb !== 'manuscripts' || !props.data.val || props.data.val.length < 1 ) {
    return null;
  }
  return <ListGroupItem>
    <a href={"http://coptot.manuscriptroom.com/manuscript-catalog/?gaNum=" + encodeURIComponent(props.data.val)} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon="external-link-alt" /> The Digital Edition of the Coptic Old Testament
    </a>
  </ListGroupItem>
}
