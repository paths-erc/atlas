import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

/**
 * SidebarPortal — renders its children into a DOM node appended directly to
 * the Leaflet map container, above all tile/overlay layers but still within
 * the map's coordinate space.  Pointer events and scroll are disabled on the
 * portal root so that clicking/scrolling the sidebar does not propagate to
 * the map.
 *
 * Must be rendered as a direct child (or descendant) of <MapContainer>.
 */
export default function SidebarPortal({ children }) {
  const map = useMap();
  const elRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = L.DomUtil.create('div', 'sidebar-portal-root');
    L.DomEvent.disableClickPropagation(el);
    L.DomEvent.disableScrollPropagation(el);
    elRef.current = el;
    map.getContainer().appendChild(el);
    setReady(true);
    return () => { el.remove(); };
  }, [map]);

  if (!ready) return null;
  return ReactDOM.createPortal(children, elRef.current);
}
