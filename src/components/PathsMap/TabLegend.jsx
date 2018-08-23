import React, { Component } from 'react';

export default class TabLegend extends Component {

  render() {

    return (
      <div>

        <h5>Marker symbols</h5>
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

        <hr />
        <h5>Basemaps</h5>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0}}>
          <li className="p-1 m-1">
            <a href="http://pelagios.org/maps/greco-roman/" target="_blank" rel="noopener noreferrer">Imperium, Pelagios</a>
          </li>
          <li className="p-1 m-1">
            <a href="http://dare.ht.lu.se/" target="_blank" rel="noopener noreferrer">Imperium, Digital Atlas of Ancient World (DARE)</a>
          </li>
          <li className="p-1 m-1">
            <a href="http://awmc.unc.edu/wordpress/" target="_blank" rel="noopener noreferrer">Ancient World Mapping Center</a>
          </li>
          <li className="p-1 m-1">
            <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer">Open Street Map</a>
          </li>
        </ul>
      </div>
    );
  }
}
