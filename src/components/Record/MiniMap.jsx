import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class MiniMap extends Component {

  render() {
    if (this.props.geom.length < 1) {
      return null;
    }
    const position = JSON.parse(this.props.geom[0].geojson).coordinates.reverse();
    

    return (
      <div style={{ height: '300px', width: '100%'}}>
        <Map className="sidebar-map maxHeight" center={ position } zoom={10} zoomControl={true}>
          <TileLayer url="http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png" />

          { this.props.geom.map( (e, i) => {
            const coord = JSON.parse(e.geojson).coordinates.reverse();
            return <Marker position={ coord } key={ i }>
              <Popup>
                Latitude: {coord[0]}<br />
                Longitude: {coord[1]}<br />
                CRS: <a href="https://epsg.io/4326" target="_blank" rel="noopener noreferrer">WGS84 [EPSG:4326]</a>
              </Popup>
            </Marker>
          } ) }
        </Map>
      </div>

    );
  }
}

export default MiniMap;
