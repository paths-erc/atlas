import React, { useState, useEffect } from 'react';
import { TileLayer, LayersControl, WMSTileLayer, GeoJSON } from 'react-leaflet';

import { GoogleLayer } from 'react-leaflet-google-v2';

import PathsPlaces from './PathsPlaces';
import { Themes as GisThemes} from '../../Services/Cfg/remoteGisSources';
import GoogleApiKey from '../../Services/Cfg/GoogleApiKey';
import { pointToLayer, onEachFeature } from './Defaults';

const { BaseLayer, Overlay } = LayersControl;


export default function Layers(props){

  const [cached, addToCache] = useState([]);
  const [remotes, addRemote] = useState([]);

  useEffect( ()=>{
    GisThemes.map(e => {
      if (cached.includes(e.name)){
        return false;
      }
      fetch(e.url).then( function(response){
        response.json().then(function(j){
          addToCache(cached.concat(e.name));
          addRemote(remotes.concat({
            "name": e.name,
            "url": e.url,
            "info": e.info,
            "geojson": j,
          }));
        });
      });
      return true;
    });
  });

  return (
    <LayersControl position="topright">

      {
      // <BaseLayer name="Imperium (Pelagios)">
      //   <TileLayer url="http://pelagios.org/tilesets/imperium/{z}/{x}/{y}.png" />
      // </BaseLayer>
      }

      <BaseLayer name="AWMC" checked="true">
        <TileLayer url="http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png" />
      </BaseLayer>

      <BaseLayer name="Imperium (DARE)">
        <TileLayer url="http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png" />
      </BaseLayer>

      <BaseLayer name="OpenStreetMap">
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      </BaseLayer>


      <BaseLayer name="Google Maps">
        <GoogleLayer googlekey={GoogleApiKey}  maptype="ROADMAP" />
      </BaseLayer>

      <BaseLayer name="Google Satellite">
        <GoogleLayer googlekey={GoogleApiKey}  maptype="SATELLITE" />
      </BaseLayer>


      <BaseLayer name="Series 4085 - GB &amp; USA">
        <WMSTileLayer url="http://wms.paths-erc.eu/"
            layers="Series 4085-Great Britain War Office-U.S. Army Map Service-1941-" />
      </BaseLayer>

      <BaseLayer name="Arrowsmith 1807">
        <WMSTileLayer url="http://wms.paths-erc.eu/"
            layers="Arrowsmith 1807" />
      </BaseLayer>

      { props.shownPlaces &&
        <PathsPlaces
          shownPlaces={ props.shownPlaces }
          onAdd={ props.onAdd }
          />
      }
      {
        remotes.map( (r, i) =>{
          const col = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
          return (<Overlay name={r.name} key={i}>
            <GeoJSON
              data={r.geojson}
              pointToLayer={ (t, i) => pointToLayer(t, i, col) }
              onEachFeature={ (feature, layer) => onEachFeature(feature, layer, r) }
              />
          </Overlay>)
        })
      }
    </LayersControl>
  );

}
