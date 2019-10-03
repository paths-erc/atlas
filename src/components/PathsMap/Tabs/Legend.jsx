import React, { Component } from 'react';

export default class Legend extends Component {

  render() {

    return (
      <React.Fragment>

        <h5>Map legend</h5>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0}}>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: '#f64747'}}></span>
            Production places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: '#d47500'}}></span>
            Storage places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: '#aa8f00'}}></span>
            Discovery places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: '#b381b3'}}></span>
            Discovery and production places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: '#009fd4'}}></span>
            Storage and production places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: '#00aa55'}}></span>
            Discovery and storage places of manuscripts
          </li>
          <li className="p-1 m-1">
            <span className="legend-item rounded-circle" style={{ background: '#939393'}}></span>
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
      </React.Fragment>
    );
  }
}
