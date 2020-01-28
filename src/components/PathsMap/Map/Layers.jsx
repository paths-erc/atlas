import React, { useState, useEffect } from 'react';
import { TileLayer, LayersControl, WMSTileLayer, GeoJSON } from 'react-leaflet';
import { GoogleLayer } from 'react-leaflet-google-v2';
import axios from 'axios';

import PathsPlaces from './PathsPlaces';
import { Themes as GisThemes} from '../../Services/Cfg/remoteGisSources';
import GoogleApiKey from '../../Services/Cfg/GoogleApiKey';
import { pointToLayer, onEachFeature } from './Defaults';

const { BaseLayer, Overlay } = LayersControl;


export default function Layers(props){

  const [remotes, setRemotes] = useState();

  useEffect( ()=>{
    let remotesArr = [];
    const axiosArray = GisThemes.map( e => {
      
      remotesArr.push({
        name: e.name,
        url: e.url,
        info: e.info
      });
      return axios({
        method: 'get',
        url: e.url
      });
    });
    axios.all(axiosArray).then(respArr => {
      respArr.map((geojson, k) => {
        remotesArr[k].geojson = geojson.data;
        return true;
      });
      setRemotes(remotesArr);
    });
  }, []);

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
        <TileLayer url="https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png" />
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


      <BaseLayer name="Napoleonic survey of Egypt (Pierre Jacotin 1827)">
        <WMSTileLayer url="http://wms.paths-erc.eu/"
            layers="Pierre Jacotin 1827" />
      </BaseLayer>
      
      <BaseLayer name="Series 4085 - GB &amp; USA">
        <WMSTileLayer url="http://wms.paths-erc.eu/"
            layers="Series 4085-Great Britain War Office-U.S. Army Map Service-1941-" />
      </BaseLayer>

      <BaseLayer name="Arrowsmith 1807">
        <WMSTileLayer url="http://wms.paths-erc.eu/"
            layers="Arrowsmith 1807" />
      </BaseLayer>
      { 
      props.shownPlaces &&
        <PathsPlaces shownPlaces={ props.shownPlaces } onAdd={ props.onAdd } />
      }
      {
        remotes && remotes.map( (r, i) => {
          
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
