import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import SiteMaps from '../PathsMap/Map/SiteMaps';

const { BaseLayer } = LayersControl;

/**
 * Turn one `geodata` entry from the record API into a Leaflet [lat, lng] pair.
 *
 * Since BraDypUS v5.9.0 `entry.geojson` is a GeoJSON geometry *object*
 * ({ type: 'Point', coordinates: [lng, lat] }); older builds sent it as a
 * JSON string, and it is `null` when the backend could not convert the WKT.
 * Only Point geometries have a meaningful single marker position.
 */
const toLatLng = (entry) => {
  let gj = entry && entry.geojson;
  if (!gj) return null;
  if (typeof gj === 'string') {
    try { gj = JSON.parse(gj); } catch { return null; }
  }
  const c = gj && gj.coordinates;
  if (!Array.isArray(c) || typeof c[0] !== 'number' || typeof c[1] !== 'number') {
    return null;
  }
  return [c[1], c[0]]; // GeoJSON [lng, lat] → Leaflet [lat, lng]
};

export default function MiniMap(props) {

  const geom_arr = props.geom ? Object.values(props.geom) : [];
  const id = props.id;

  const points = geom_arr
    .map(e => toLatLng(e))
    .filter(Boolean);

  if (points.length < 1) {
    return null;
  }

  return (
    <div style={{ height: '300px', width: '100%'}} className="mb-5">
      <MapContainer
        className="sidebar-map maxHeight"
        center={points[0]}
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
            points.map((coord, i) => (
              <Marker position={coord} key={i}>
                <Popup>
                  Latitude: {coord[0]}<br />
                  Longitude: {coord[1]}<br />
                  CRS: <a href="https://epsg.io/4326" target="_blank" rel="noopener noreferrer">WGS84 [EPSG:4326]</a>
                </Popup>
              </Marker>
            ))
          }
        </LayersControl>
      </MapContainer>
    </div>
  );
}
