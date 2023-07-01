import React from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSMap from '../../Services/CSMap';



export default function CS(props) {
  console.log(props)

  if ( !CSMap.hasOwnProperty(props.tb)  || !CSMap[props.tb].hasOwnProperty(props.data) ) {
    return null;
  }

  return (
    <div>
      { CSMap[props.tb][props.data].map( (v, k) => {
        return <ListGroupItem key={k}>
          <a href={`https://data.copticscriptorium.org/${v.trim()}` } target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="external-link-alt" /> Coptic Scriptorium {v}
          </a>
        </ListGroupItem>
      }) }
    </div>
  );
}
