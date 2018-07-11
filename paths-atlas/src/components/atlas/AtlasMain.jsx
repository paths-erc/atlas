import React, { Component } from 'react';
import { Map, TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import hash from 'object-hash';
import bbox from 'geojson-bbox';

import { Sidebar, Tab } from 'react-leaflet-sidebarv2';
import L from 'leaflet';

import Header from "../mainLayout/Header"
import ListPlaces from './ListPlaces';
import UrlFilterButton from './UrlFilterButton';
import TabLegend from './TabLegend';
import TabSavedQueries from './TabSavedQueries';

import './Atlas.css';

const { BaseLayer, Overlay } = LayersControl



export default class AtlasMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarCollapsed: false,
      selected: 'home',
      shownPlaces: props.places,
      manualFilter: ''
    };
  }

  setFilteredPlaces(){
    this.refs.placesLayer.leafletElement.eachLayer( (layer) => {
      let found = false;
      for (const value of Object.values(layer.feature.properties)) {
        if (value && value.toLowerCase().includes(this.state.manualFilter.toLowerCase())){
          found = true;
        }
      }
      if (found || this.state.manualFilter === ''){
        layer.getElement().style.display = 'inline';
      } else {
        layer.getElement().style.display = 'none';
      }
    });
  }

  onSidebarClose() {
    this.setState({sidebarCollapsed: true});
  }

  onSidebarOpen(id) {
    this.setState({
      sidebarCollapsed: false,
      selected: id,
    })
  }

  pointToLayer(t, i) {
    return new L.CircleMarker(i, {
      radius: 5,
      weight: 1,
      color: "#000",
      opacity: 0.9,
      fillColor: (t.properties.type === 'discovery' ? '#ff0000' : t.properties.type === 'storage' ? '#00ff00' : '#0000ff'),
      fillOpacity: 0.5
    })
  }

  onEachFeature(feature, layer){
    layer.bindPopup(
      '<strong>' + feature.properties.name + '</strong>' +
       (feature.properties.copticname ? '<br><span class="coptic">' + feature.properties.copticname + '</span>': '') +
       '<br>' +
       '<a href="/read/places/' + feature.properties.id + '">paths/places/' + feature.properties.id +'</a>'

    );
  }

  filterPlaces(e) {
    const str =  e.target.value;

    let fgj = {};

    if (str === ''){
      fgj = this.props.places;
    } else {
      fgj = {
        "type": "FeatureCollection",
        "features": []
      };

      for (const val of Object.values(this.props.places.features)) {
        if (Object.values(val.properties).join('|').toLowerCase().includes(str.toLowerCase())){
          fgj.features.push(val);
        }
      }
    }

    this.setState({
      manualFilter: str,
      shownPlaces: fgj
    });
  }

  clearFiltered(){
    this.setState({
      manualFilter: '',
      shownPlaces: this.props.places
    });
  }

  clearButton(){
    if (this.state.manualFilter){
      return <InputGroupAddon addonType="append">
        <Button color="danger" onClick = { this.clearFiltered.bind(this) }>
          <span aria-hidden="true">&times;</span>
        </Button>
      </InputGroupAddon>
    }
  }

  render() {

    if (!this.state.shownPlaces) {
      return null;
    }

    const bb = bbox(this.state.shownPlaces);

    let bounds = [ [19.700194, 16.570227], [35.4737, 32.869317] ];

    if (bb[0] === bb[2] && bb[1] === bb[3]) {
      bb[0] = bb[0] + .1;
      bb[1] = bb[1] + .1;
      bb[2] = bb[2] - .1;
      bb[3] = bb[3] - .1;
    }

    if( bb[0] !== Infinity ){
      bounds = [
        [ bb[1], bb[0] ],
        [ bb[3], bb[2] ]
      ];
    }

    return (
      <div className="maxHeight">
        <Header location={this.props.location} />
          <main role="main" className="maxHeight">

          <Sidebar id="sidebar" collapsed={this.state.sidebarCollapsed} selected={this.state.selected}
                   onOpen={this.onSidebarOpen.bind(this)} onClose={this.onSidebarClose.bind(this)}
                   closeIcon="fa fa-caret-left">
            <Tab id="home" header="Home" icon="fa fa-home">

              <UrlFilterButton urlFilter={ this.props.urlFilter } filter={ this.props.filter }/>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Search:
                </InputGroupAddon>
                <Input type="search" value={this.state.manualFilter} onChange={this.filterPlaces.bind(this)} placeholder="start typing to filter places..." />

                { this.clearButton() }
              </InputGroup>

              <ListPlaces places={ this.state.shownPlaces } />

            </Tab>
            <Tab id="legend" header="Legend" icon="fa fa-info">
              <TabLegend />
            </Tab>
            <Tab id="savedQueries" header="Legend" icon="fa fa-save">
              <TabSavedQueries />
            </Tab>
            <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
              <p>Settings dialogue.</p>
            </Tab>
          </Sidebar>

          <Map className="sidebar-map maxHeight" bounds={ bounds } zoomControl={true} ref="map">
            <LayersControl position="topright">
              <BaseLayer name="Imperium (Pelagios)">
                <TileLayer url="http://pelagios.org/tilesets/imperium/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="Imperium (DARE)">
                <TileLayer url="http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="AWMC" checked={true}>
                <TileLayer url="http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="OpenStreetMap">
                <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              </BaseLayer>

              { this.state.places !== null &&
              <Overlay name="Places" checked={true}>
                <GeoJSON ref="placesLayer" key={ hash(this.state.shownPlaces) } data={this.state.shownPlaces} pointToLayer={this.pointToLayer.bind(this)} onEachFeature={this.onEachFeature.bind(this) } />
              </Overlay>
            }
            </LayersControl>

          </Map>
        </main>
      </div>
    );
  }
}
