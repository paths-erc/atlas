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
  const p = feature.properties;
  // /geoface keys the properties by field *label* (e.g. "Site name"), matching
  // ListPlaces. Fall back through the likely name keys so a label rename in the
  // bdus config never turns the popup title into "undefined".
  const name = p['Site name'] || p.name || p['Toponym'] || p['Nome'] || `paths.places.${p.id}`;
  layer.bindPopup(`<strong>${name}</strong>` +
     (p.copticname ? '<br /><span class="coptic">' + p.copticname + '</span>' : '') +
     (p.type ? `<br /><span class="text-secondary">${p.type}</span>` : '') +
     `<br /><a href="${base}/places/${p.id}">paths/places/${p.id}</a>`
  );
  layer.on('mouseover', function() { layer.openPopup(); });
};

export default function PathsPlaces(props){

  return(
    <React.Fragment>
      { props.shownPlaces && <GeoJSON
        eventHandlers={{ add: props.onAdd }}
        key={ hash(props.shownPlaces) }
        data={ props.shownPlaces }
        pointToLayer={ pointToLayer }
        onEachFeature={ onEachFeature }
        /> }
    </React.Fragment>
  );
}
