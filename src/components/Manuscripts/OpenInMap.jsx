import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OpenInMap extends Component {

render() {

  const tb = this.props.tb;

  if (['manuscripts', 'places'].indexOf(tb) < 0){
    return null;
  }
  return (
    <div className="float-right mt-2">
      <Link to={'/map?tb=' + tb + '&where=' + encodeURI(this.props.where) } className="btn btn-warning">
        <FontAwesomeIcon icon="map-marker-alt" /> View on Map
      </Link>
    </div>
  );
  }
}

export default OpenInMap;
