import React from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import SiteMaps from '../PathsMap/Map/SiteMaps';
import { GoogleLayer } from 'react-leaflet-google-v2';
import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen';


import GoogleApiKey from '../Services/Cfg/GoogleApiKey';
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
        <Map  className="sidebar-map maxHeight" 
              center={ position } 
              zoom={15} 
              zoomControl={true}
              >
          <FullscreenControl position="topleft" />
          <LayersControl position="topright">
            <BaseLayer name="AWMC">
              <TileLayer url="http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png" />
            </BaseLayer>

            <BaseLayer name="Imperium (DARE)">
              <TileLayer url="https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png" />
            </BaseLayer>

            <BaseLayer name="OpenStreetMap">
              <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            </BaseLayer>

            <BaseLayer name="Google Satellite" checked="true">
              <GoogleLayer googlekey={GoogleApiKey}  maptype="SATELLITE" />
            </BaseLayer>
          
          <SiteMaps siteId={id} />

          {
            geom_arr.map( (e, i) => {
              const coord = JSON.parse(e.geojson).coordinates.reverse();
              return <Marker position={ coord } key={ i }>
                <Popup>
                  Latitude: {coord[0]}<br />
                  Longitude: {coord[1]}<br />
                  CRS: <a href="https://epsg.io/4326" target="_blank" rel="noopener noreferrer">WGS84 [EPSG:4326]</a>
                </Popup>
              </Marker>
              } ) 
          }

          </LayersControl>
        </Map>
      </div>
  );
}
