import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function CopticColophons (props) {

  if ( props.tb !== 'colophons' || !props.data.val || props.data.val.length < 1 ) {
    return null;
  }
  return <ListGroupItem>
    <a href={`https://github.com/paths-erc/coptic-texts/blob/master/colophons/paths.colophons.${props.data.val}.xml` } target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon="external-link-alt" /> View marked-up text on GitHub
    </a>
  </ListGroupItem>
}
