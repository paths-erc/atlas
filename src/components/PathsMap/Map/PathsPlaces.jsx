import React from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import hash from 'object-hash';


const pointToLayer = (t, i) => {
  let col = '#0f4880'; // 15, 72, 128

  if (t.properties.type){

    // discovery && storage && production
    if (t.properties.type.includes('discovery') && t.properties.type.includes('storage') && t.properties.type.includes('production')) {
      col = '#939393'; //147, 147, 147

    // dicovery && storage
    } else if (t.properties.type.includes('discovery') && t.properties.type.includes('storage')) {
      col = '#00aa55'; // rgb 0,170,85

    // storage && production
    } else if (t.properties.type.includes('storage') && t.properties.type.includes('production')) {
      col = '#009fd4'; // 0, 159, 212

    // dicovery && production
    } else if (t.properties.type.includes('discovery') && t.properties.type.includes('production')) {
      col = '#b381b3'; // 179, 129, 179

    // discovery
    } else if (t.properties.type.includes('discovery')){
      col = '#aa8f00'; // 170, 143, 0

    // storage
    } else if (t.properties.type.includes('storage')) {
      col = '#d47500'; // 212, 117, 0

    // production
    } else if (t.properties.type.includes('production')) {
      col = '#f64747'; // 246, 71, 71
    }
  }

  return new L.CircleMarker(i, {
    radius: 5,
    weight: 1,
    color: "#fff",
    opacity: 0.9,
    fillColor: col,
    fillOpacity: 1
  })
};

const onEachFeature = (feature, layer) => {
  const base = window.location.pathname.replace(/\/map(.*)/, '');
  layer.bindPopup(`<strong>${feature.properties.name}</strong>` +
     (feature.properties.copticname ? '<br /><span class="coptic">' + feature.properties.copticname + '</span>': '') +
     (feature.properties.type ? `<br /><span class="text-secondary">${feature.properties.type}</span>` : '') +
     `<br /><a href="${base}/places/${feature.properties.id}">paths/places/${feature.properties.id}</a>`
  );
  layer.on('mouseover', function() { layer.openPopup(); });
};

export default function PathsPlaces(props){

  return(
    <React.Fragment>
      { props.shownPlaces && <GeoJSON
        onAdd={props.onAdd}
        key={ hash(props.shownPlaces) }
        data={ props.shownPlaces }
        pointToLayer={ pointToLayer }
        onEachFeature={ onEachFeature }
        /> }
    </React.Fragment>
  );
}
