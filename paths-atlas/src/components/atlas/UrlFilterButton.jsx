import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


export default class UrlFilterButton extends Component {

render() {

    if (this.props.urlFilter) {
      return (
        <div>
          <NavLink href="/atlas" className="btn btn-warning mt-3 mb-3">
            <FontAwesomeIcon icon="filter" /> Filter active. Click to disable
          </NavLink>
        </div>

      );
    } else {
      return null;
    }

  }
}
