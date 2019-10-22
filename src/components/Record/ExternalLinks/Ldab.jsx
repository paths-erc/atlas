import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Ldab(props) {

  if ( props.tb !== 'manuscripts' || !props.data.val || props.data.val.length < 1 ) {
    return null;
  }
  return (
    <div>
      { props.data.val.split(',').map( (v, k) => {
        return <ListGroupItem key={k}>
          <a href={"https://www.trismegistos.org/ldab/text.php?quick=" + v.trim() } target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="external-link-alt" /> LDAB {v}
          </a>
        </ListGroupItem>
      }) }
    </div>
  );
}
