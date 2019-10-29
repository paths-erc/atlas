import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function OpenInMap(props) {

  const tb = props.tb;

  if (['manuscripts', 'places'].indexOf(tb) < 0){
    return null;
  }
  return (
    <div className="float-right mt-2">
      <Link to={'/map?tb=' + tb + '&where=' + encodeURI(props.where) } className="btn btn-warning">
        <FontAwesomeIcon icon="map-marker-alt" /> View on Map
      </Link>
    </div>
  );
}

