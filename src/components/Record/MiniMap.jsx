import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import SiteMaps from '../PathsMap/Map/SiteMaps';

const { BaseLayer } = LayersControl;

export default function MiniMap(props) {

  const geom_arr = props.geom ? Object.values(props.geom) : false;
  const id = props.id;

  if (!geom_arr || geom_arr.length < 1) {
    return null;
  }

  const position = JSON.parse(geom_arr[0].geojson).coordinates.reverse();

  return (
    <div style={{ height: '300px', width: '100%'}} className="mb-5">
      <MapContainer
        className="sidebar-map maxHeight"
        center={position}
        zoom={15}
        zoomControl={true}
      >
        <LayersControl position="topright">
          <BaseLayer name="Imperium (DARE)">
            <TileLayer url="https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png" />
          </BaseLayer>

          <BaseLayer name="OpenStreetMap" checked={true}>
            <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          </BaseLayer>

          <SiteMaps siteId={id} />

          {
            geom_arr.map((e, i) => {
              const coord = JSON.parse(e.geojson).coordinates.reverse();
              return (
                <Marker position={coord} key={i}>
                  <Popup>
                    Latitude: {coord[0]}<br />
                    Longitude: {coord[1]}<br />
                    CRS: <a href="https://epsg.io/4326" target="_blank" rel="noopener noreferrer">WGS84 [EPSG:4326]</a>
                  </Popup>
                </Marker>
              );
            })
          }
        </LayersControl>
      </MapContainer>
    </div>
  );
}
