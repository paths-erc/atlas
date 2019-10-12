import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

import { SiteMapsList } from '../../Services/Cfg/remoteGisSources';


const getStyle = (f) =>{
  const p = f.properties;

  // Default stroke and fill opacity
  let s = {
    weight: 2,
    fillOpacity: .2
  };

  // Set opacity variable
  let opacity;

  // Reconstructed features have dashed strokes and .4 opacity
  if (p.reconstr){
    s.dashArray = '4 4';
    opacity = 0.4;
  } else {
    // Other features have .8 opacity
    opacity = 0.8
  }

  // Differentiate strike and fill colors by phase
  switch(true){
    case (p.phase < -1):
      s.color = 'rgba(150, 150, 150, ' + opacity + ')';
      s.fillColor = 'rgba(150, 150, 150, .4)';
      break;
    case (p.phase === -1):
      s.color = 'rgba(61, 90, 128, ' + opacity + ')';
      s.fillColor = 'rgba(61, 90, 128, .4)';
      break;
      case (p.phase === 1):
      s.color = 'rgba(247, 110, 1, ' + opacity + ')';
      s.fillColor = 'rgba(247, 110, 1, .4)';
      break;
    case (p.phase === 2):
      s.color = 'rgba(194, 0, 251, ' + opacity + ')';
      s.fillColor = 'rgba(194, 0, 251, .4)';
      break;
    case (p.phase === 3):
      s.color = 'rgba(56, 134, 89, ' + opacity + ')';
      s.fillColor = 'rgba(56, 134, 89, .4)';
      break;
    case (p.phase > 3):
      s.color = 'rgba(80, 47, 76, ' + opacity + ')';
      s.fillColor = 'rgba(56, 134, 89, .4)';
      break;
    default:
      s.color = 'rgba(31, 120, 180, ' + opacity + ')';
      s.fillColor = 'rgba(31, 120, 180, .4)';
      break;
  }

  // Set style for upper projections
  if (p.part && p.part.indexOf('u') > -1) {
    s.fill = false;
    s.color = 'rgba(0, 0, 0, .2)';

  // Set style for lower projections
  } else if (p.part && p.part.indexOf('l') > -1) {
    s.fillColor = 'rgba(0, 0, 0, .1)';
    s.color = 'rgba(0, 0, 0, .2)';

  // Set style for doorways
  } else if (p.part && p.part.indexOf('d') > -1) {
    s.fillColor = 'rgba(171, 221, 164, .8)';
    s.color = 'rgba(171, 221, 164, 1)';
  }

  // finished: return the style object
  return s;
};

const onEachFeature = (feature, layer) => {
  layer.bindPopup(`<a href="https://atlas.paths-erc.eu/places/${feature.properties.place}">paths.places.${feature.properties.place}</a>
  <br />${feature.properties.subplace}
  <br />Vectorized from: <a href="https://www.zotero.org/groups/2189557/erc-paths/items/itemKey/${feature.properties.source}" target="_blank">PAThs Zotero ${feature.properties.source} ${feature.properties.subsource}</a>
  <br />Phase: ${feature.properties.phase}`
  );
}


export default function SiteMaps(props){
  const bounds = props.bounds;
  const zoom = props.zoom;

  const [loadedSites, addLoadedSite] = useState([]);
  const [siteMaps, addSiteMap] = useState([]);


  useEffect( ()=>{
    SiteMapsList.map( e => {
      if (zoom >= e.z - 5 && bounds.contains(e.c)){
        fetch(`https://docs.paths-erc.eu/data/geojson/${e.n}.geojson`).then( function(response){
          response.json().then(function(j){
            if (loadedSites.includes(e.n)){
              return;
            }
            addLoadedSite(loadedSites.concat(e.n));
            addSiteMap(siteMaps.concat(j));
          });
        });
      }
      return true;
    });
  });

  return (
    <React.Fragment>
      { siteMaps.map((e, i)=>{
        return <GeoJSON
            key={i}
            data={e}
            style={ getStyle }
            onEachFeature={ onEachFeature }
          />
      }) }
    </React.Fragment>
  );
}
