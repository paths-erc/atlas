import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function OpenInMap(props) {
  const { tb, filter } = props;

  if (['manuscripts', 'places'].indexOf(tb) < 0) {
    return null;
  }

  const filterParam = filter ? '&filter=' + encodeURIComponent(JSON.stringify(filter)) : '';

  return (
    <div className="float-end mt-2">
      <Link to={`/map?tb=${tb}${filterParam}`} className="btn btn-warning">
        <FontAwesomeIcon icon="map-marker-alt" /> View on Map
      </Link>
    </div>
  );
}

