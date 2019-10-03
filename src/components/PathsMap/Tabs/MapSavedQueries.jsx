import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SavedQueries from '../../Services/SavedQueries';

export default class MapSavedQueries extends Component {

  render() {
    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0}}>
        { Object.values(SavedQueries.map).map( (e, i) => {
          return <li key={i}  className="mb-3">
            <Link to={ '/map/saved/' + e.id }>
              <FontAwesomeIcon icon="arrow-circle-right" /> { e.title }
            </Link>
          </li>
        }) }
      </ul>
    );
  }
}
