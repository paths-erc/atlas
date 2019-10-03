import React from 'react';
import { TileLayer, LayersControl, WMSTileLayer } from 'react-leaflet';

import { GoogleLayer } from 'react-leaflet-google';

import SiteMaps from './SiteMaps';
import PathsPlaces from './PathsPlaces';

const { BaseLayer } = LayersControl

const googleKey = "AIzaSyCLRylxZwGnCbbDE7pH-oUURTZHOre7h5o";



const tiles = [
  // {
  //   "name": "Imperium (Pelagios)",
  //   "url": "http://pelagios.org/tilesets/imperium/{z}/{x}/{y}.png",
  //   "checked": false
  // },
  {
    "name": "AWMC",
    "url": "http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png",
    "checked": true
  },
  {
    "name": "Imperium (DARE)",
    "url": "http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png",
    "checked": false
  },
  {
    "name": "OpenStreetMap",
    "url": "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    "checked": false
  }
];

const google = [
  {
    "name": "Google Maps",
    "type": "ROADMAP"
  }, {
    "name": "Google Satellite",
    "type": "SATELLITE"
  }
  ];

  const wms = [
    {
      "name": "Series 4085 - GB &amp; USA",
      "url": "http://wms.paths-erc.eu/",
      "layers": "Series 4085-Great Britain War Office-U.S. Army Map Service-1941-"
    },
    {
      "name": "Arrowsmith 1807",
      "url": "http://wms.paths-erc.eu/",
      "layers": "Arrowsmith 1807"
    }
  ];

export default function BaseLayers(props){

  return (
    <LayersControl position="topright">

      {
        tiles.map( (e, i) => {
        return (<BaseLayer key={i} name={ e.name } checked={ e.checked }>
          <TileLayer url={ e.url } />
        </BaseLayer>);
        })
      }

      {
        google.map( (e, i) => {
          return (<BaseLayer key={i} name={ e.name }>
              <GoogleLayer googlekey={googleKey}  maptype={ e.type } />
            </BaseLayer>)
          })
      }
      
      {
        wms.map( (e,i) => {
          return (<BaseLayer name={ e.name } key={ i }>
            <WMSTileLayer layers={ e.layers } url={ e.url } />
          </BaseLayer>);
        })
      }


      { props.shownPlaces &&
        <PathsPlaces
          shownPlaces={ props.shownPlaces }
          onAdd={ props.onAdd }
          />
      }

      { props.mapBounds && props.zoom &&
        <SiteMaps
          bounds={ props.mapBounds }
          zoom={ props.zoom } />
      }

    </LayersControl>
  );

}
