import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export default class UrlFilterButton extends Component {

render() {

    if (this.props.urlFilter) {
      return (
        <div>
          <Link to="/map" className="btn btn-warning btn-block mt-1 mb-3">
            <FontAwesomeIcon icon="filter" /> Filter active. Click to disable
          </Link>
        </div>

      );
    } else {
      return null;
    }

  }
}
