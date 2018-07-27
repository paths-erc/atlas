import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MsPlaces extends Component {

render() {

  const tb = this.props.tb;

  if (tb !== 'manuscripts'){
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

export default MsPlaces;
