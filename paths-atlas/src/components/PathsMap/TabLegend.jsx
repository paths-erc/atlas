import React, { Component } from 'react';

export default class TabLegend extends Component {

  render() {

    return (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0}}>
        <li className="p-1 m-1">
          <span className="legend-item rounded-circle" style={{ background: 'rgba(255, 0, 0, .9)'}}></span>
          Discovery
        </li>
        <li className="p-1 m-1">
          <span className="legend-item rounded-circle" style={{ background: 'rgba(0, 0, 255, .9)'}}></span>
          Production
        </li>
        <li className="p-1 m-1">
          <span className="legend-item rounded-circle" style={{ background: 'rgba(0, 255, 0, .9)'}}></span>
          Storage
        </li>
      </ul>
    );
  }
}
