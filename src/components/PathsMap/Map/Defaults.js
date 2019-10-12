/* jshint esversion: 6 */

import L from 'leaflet';

export const pointToLayer = (t, i, col) => {
  return new L.CircleMarker(i, {
    radius: 5,
    weight: 1,
    color: col ? col : false
  });
};


export const onEachFeature = (feature, layer, info) => {
  const html = Object.entries(feature.properties).map(e => {
    if (!e[1]){
      return false;
    }
    return `<strong>${e[0]}</strong>: ${e[1]}`;
  });

  layer.bindPopup(
    html.filter(Boolean).join('<br>') +
    `<hr><strong>${info.name}</strong><br>
    <a href="${info.info}" title="More information">${info.info}</a>
    `);
};
