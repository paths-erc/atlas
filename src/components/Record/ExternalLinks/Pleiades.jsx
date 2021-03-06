import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Pleiades(props) {

  if ( props.tb !== 'places' || !props.data.val || props.data.val.length < 1 ) {
    return null;
  }
  return (
    <div>
      { props.data.val.split(',').map( (v, k) => {
        return <ListGroupItem key={k}>
          <a href={"https://pleiades.stoa.org/places/" + v.trim() } target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="external-link-alt" /> Pleiades {v}
          </a>
        </ListGroupItem>
      }) }
    </div>
  );
}
