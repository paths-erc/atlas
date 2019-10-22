import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Dbmnt(props) {

  if ( props.tb !== 'manuscripts' || !props.data.val || props.data.val.length < 1 ) {
    return null;
  }

  return (
    <div>
      { props.data.val.split(',').map( (v, k) => {
        return <ListGroupItem key={k}>
          <a href={`http://www.dbmnt.uw.edu.pl/${v.trim()}` } target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="external-link-alt" /> DBMNT {v}
          </a>
        </ListGroupItem>
      }) }
    </div>
  );
}
