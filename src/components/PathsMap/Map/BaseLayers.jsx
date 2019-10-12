import React from 'react';
import { TileLayer, LayersControl, WMSTileLayer } from 'react-leaflet';

import { GoogleLayer } from 'react-leaflet-google';

import SiteMaps from './SiteMaps';
import PathsPlaces from './PathsPlaces';

const { BaseLayer } = LayersControl

const googleKey = "AIzaSyCLRylxZwGnCbbDE7pH-oUURTZHOre7h5o";

export default function BaseLayers(props){

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
        <GoogleLayer googlekey={googleKey}  maptype="ROADMAP" />
      </BaseLayer>

      <BaseLayer name="Google Satellite">
        <GoogleLayer googlekey={googleKey}  maptype="SATELLITE" />
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

      { props.mapBounds && props.zoom &&
        <SiteMaps
          bounds={ props.mapBounds }
          zoom={ props.zoom } />
      }

    </LayersControl>
  );

}
