const MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/**
 * Escapes a value for safe interpolation into an HTML string
 * (e.g. Leaflet popups, which are built from strings).
 * @param  {*} value Any value; null/undefined become an empty string
 * @return {String}
 */
export default function escapeHtml(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value).replace(/[&<>"']/g, c => MAP[c]);
}
