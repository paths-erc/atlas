import { Component } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { withLeaflet } from 'react-leaflet';

class SidebarPortal extends Component {
  componentDidMount() {
    this._el = L.DomUtil.create('div', 'sidebar-portal-root');
    L.DomEvent.disableClickPropagation(this._el);
    L.DomEvent.disableScrollPropagation(this._el);
    this.props.leaflet.map.getContainer().appendChild(this._el);
    this.forceUpdate();
  }

  componentWillUnmount() {
    if (this._el) this._el.remove();
  }

  render() {
    if (!this._el) return null;
    return ReactDOM.createPortal(this.props.children, this._el);
  }
}

export default withLeaflet(SidebarPortal);
