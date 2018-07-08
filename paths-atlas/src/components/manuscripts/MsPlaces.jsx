import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import qs from 'qs';


class MsPlaces extends Component {

render() {

  const tb = this.props.tb;

  if (tb !== 'manuscripts'){
    return null;
  }
  return (
    <div className="float-right mt-2">
      <Link to={'/atlas?tb=' + tb + '&type=' + this.props.type + '&filter=1&' + qs.stringify(this.props.search) } className="btn btn-warning">
        <FontAwesomeIcon icon="map-marker-alt" /> View on Map
      </Link>
    </div>
  );
  }
}

export default MsPlaces;
