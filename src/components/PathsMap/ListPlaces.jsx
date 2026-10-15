import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ListPlaces extends Component {

  render() {
    if (!this.props.places || !this.props.places.features) {
      return null;
    }
    const features = this.props.places.features;
    return (
      <div className="mt-3">
        <h5>Found {features.length} places</h5>
        <ol>
          {features.map((e, i) => {
            const p = e.properties;
            return (
              <li key={i} className="border-bottom border-info mb-3 pb-1">
                <strong>{p['Site name']}</strong>
                {p['Region'] && <div><small>{p['Region']}</small></div>}
                <div>
                  <small>
                    <FontAwesomeIcon icon="id-badge" />{' '}
                    <Link to={'/places/' + p.id}>paths.places.{p.id}</Link>
                  </small>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}
