import React, { Component } from 'react';

export default class TabLegend extends Component {

  render() {

    return (
      <div>

        <h5>Map legend</h5>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0}}>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: 'rgba(170, 143, 0, 1)'}}></span>
            Discovery places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: 'rgba(246, 71, 71, 1)'}}></span>
            Production places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: 'rgba(212, 117, 0, 1)'}}></span>
            Storage places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: 'rgba(0, 170, 85, 1)'}}></span>
            Discovery and storage places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: 'rgba(179, 129, 179, 1)'}}></span>
            Discovery and production places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: 'rgba(0, 159, 212, 1)'}}></span>
            Storage and production places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: 'rgba(147, 147, 147, 1)'}}></span>
            Discovery, storage and production places of manuscripts
          </li>
        </ul>

        <hr />
        <h5>Available basemaps</h5>
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
