import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

class MiniMap extends Component {

  render() {
    if (this.props.geom.length < 1) {
      return null;
    }
    const position = JSON.parse(this.props.geom[0].geojson).coordinates.reverse();

    return (
      <div style={{ height: '300px', width: '100%' }}>
        <Map className="sidebar-map maxHeight" center={ position } zoom={10} zoomControl={true}>
          <TileLayer url="http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png" />

          { this.props.geom.map( (e, i) => {
            const coord = JSON.parse(e.geojson).coordinates.reverse();
            return (<Marker position={ coord } key={ i } />)
          } ) }

        </Map>
      </div>

    );
  }
}

export default MiniMap;
