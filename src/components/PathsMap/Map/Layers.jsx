import React, { useState, useEffect } from 'react';
import { TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
// import { GoogleLayer } from 'react-leaflet-google-v2';
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

      {/* <BaseLayer name="AWMC">
        <TileLayer url="http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png" />
      </BaseLayer> */}

      <BaseLayer name="Imperium (DARE)">
        <TileLayer url="https://dh.gu.se/tiles/imperium/{z}/{x}/{y}.png" />
      </BaseLayer>

      <BaseLayer name="OpenStreetMap">
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      </BaseLayer>

      <BaseLayer name="ESRI Satellite" checked="true">
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      </BaseLayer>

      {/* <BaseLayer name="Google Maps">
        <GoogleLayer googlekey={GoogleApiKey}  maptype="ROADMAP" />
      </BaseLayer>

      <BaseLayer name="Google Satellite">
        <GoogleLayer googlekey={GoogleApiKey}  maptype="SATELLITE" />
      </BaseLayer> */}

      <BaseLayer name="Composite: A Map of Lower Egypt from Various Surveys by A. Arrowsmith (1807)">
        <TileLayer
            attribution='&copy; <a href="http://paths.uniroma1.it/">PAThs: Archaeological Atlas of Coptic Literature</a>'
            url="https://swift.cloud.garr.it/swift/v1/arrowsmith-1807/{z}/{x}/{y}.png"
            maxZoom={15}
            />
      </BaseLayer>
      
      <BaseLayer name="Carte geographique de l'Egypte et des pays environnans by Pierre Jacotin (1818, 1828)">
        <TileLayer
          attribution='&copy; <a href="http://paths.uniroma1.it/">PAThs: Archaeological Atlas of Coptic Literature</a>'
          url="https://swift.cloud.garr.it/swift/v1/jacotin-1827/{z}/{x}/{y}.png"
          maxZoom={15}
          />
      </BaseLayer>

      <BaseLayer name="Series 4085 - GB &amp; USA (1941)">
        <TileLayer
          attribution='&copy; <a href="http://paths.uniroma1.it/">PAThs: Archaeological Atlas of Coptic Literature</a>'
          url="https://swift.cloud.garr.it/swift/v1/series-4085-gb-usa-1941/{z}/{x}/{y}.png"
          maxZoom={15}
          />
      </BaseLayer>

      <BaseLayer name="Series P502 - USA (1954)">
        <TileLayer
          attribution='&copy; <a href="http://paths.uniroma1.it/">PAThs: Archaeological Atlas of Coptic Literature</a>'
          url="https://swift.cloud.garr.it/swift/v1/series-p502-usa-1954/{z}/{x}/{y}.png"
          maxZoom={14}
          />
      </BaseLayer>
      
      <BaseLayer name="Series 1404, Great Britain War Office and Air Ministry, 1958-">
        <TileLayer
          attribution='&copy; <a href="http://paths.uniroma1.it/">PAThs: Archaeological Atlas of Coptic Literature</a>'
          url="https://swift.cloud.garr.it/swift/v1/imw-1m-1960/{z}/{x}/{y}.png"
          maxZoom={13}
          />
      </BaseLayer>
      
      <BaseLayer name="International Map of the World (1960)">
        <TileLayer
          attribution='&copy; <a href="http://paths.uniroma1.it/">PAThs: Archaeological Atlas of Coptic Literature</a>'
          url="https://swift.cloud.garr.it/swift/v1/imw-1m-1960/{z}/{x}/{y}.png"
          maxZoom={12}
          />
      </BaseLayer>
      
      <BaseLayer name="Tactical Pilotage Chart Series - World (1979)">
        <TileLayer
          attribution='&copy; <a href="http://paths.uniroma1.it/">PAThs: Archaeological Atlas of Coptic Literature</a>'
          url="https://swift.cloud.garr.it/swift/v1/tpc-500k-1979/{z}/{x}/{y}.png"
          maxZoom={14}
          />
      </BaseLayer>
      <BaseLayer name="Ministry of Finance, Egypt - Atlas of Egypt: Lower and Upper Egypt (1914)">
        <TileLayer
          attribution='&copy; <a href="http://paths.uniroma1.it/">PAThs: Archaeological Atlas of Coptic Literature</a>'
          url="https://swift.cloud.garr.it/swift/v1/min-fin-1914/{z}/{x}/{y}.png"
          maxZoom={17}
          />
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
