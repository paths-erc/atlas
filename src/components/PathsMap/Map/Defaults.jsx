/* jshint esversion: 6 */

import L from 'leaflet';
import escapeHtml from '../../Utils/escapeHtml';

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
    return `<strong>${escapeHtml(e[0])}</strong>: ${escapeHtml(e[1])}`;
  });

  layer.bindPopup(
    html.filter(Boolean).join('<br>') +
    `<hr><strong>${escapeHtml(info.name)}</strong><br>
    <a href="${escapeHtml(info.info)}" title="More information">${escapeHtml(info.info)}</a>
    `);
};
