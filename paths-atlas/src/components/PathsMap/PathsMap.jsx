import React, { Component } from 'react';
import { Map, TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import qs from 'qs';
import hash from 'object-hash';
import bbox from 'geojson-bbox';
import { Sidebar, Tab } from 'react-leaflet-sidebarv2';
import L from 'leaflet';

import Header from "../mainLayout/Header"
import ListPlaces from './ListPlaces';
import UrlFilterButton from './UrlFilterButton';
import TabLegend from './TabLegend';
import TabSavedQueries from './TabSavedQueries';

import Database from '../Services/Database/Database';

import './PathsMap.css';

const { BaseLayer, Overlay } = LayersControl

export default class PathsMap extends Component {

  constructor(props) {

    super(props);
    this.state = {
      places: null,
      shownPlaces: null,
      urlFilter: false,
      sidebarCollapsed: false,
      selected: 'home',
      manualFilter: ''
    };
  }

  onSidebarClose() {
    this.setState({
      sidebarCollapsed: true
    });
  }

  onSidebarOpen(id) {
    this.setState({
      sidebarCollapsed: false,
      selected: id,
    })
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
    const base = window.location.pathname.replace(/\/map(.*)/, '');
    layer.bindPopup(
      '<strong>' + feature.properties.name + '</strong>' +
       (feature.properties.copticname ? '<br><span class="coptic">' + feature.properties.copticname + '</span>': '') +
       '<br>' +
       '<a href="' + base + '/read/places/' + feature.properties.id + '">paths/places/' + feature.properties.id +'</a>'
    );
  }

  filterPlaces(e) {
    const str =  e.target.value;
    let fgj = {};
    if (str === ''){
      fgj = this.state.places;
    } else {
      fgj = {
        "type": "FeatureCollection",
        "features": []
      };
      for (const val of Object.values(this.state.places.features)) {
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
      shownPlaces: this.state.places
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

  getBounds(){
    let bounds = [ [19.700194, 16.570227], [35.4737, 32.869317] ];

    if (!this.state.shownPlace){
      return bounds;
    }
    const bb = bbox(this.state.shownPlaces);
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
    return bounds;
  }


  fetchData(savedQ, locationSearch){
    if (savedQ) {
      Database.getSaved('map', savedQ, null, data => {
        this.setState({
          places: data,
          shownPlaces: data,
          urlFilter: true
        });
      });
    } else if (locationSearch) {
      let qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true})
      if (qstring.tb !== 'manuscripts') {
        return false;
      }
      Database.getMsPlaces(qstring.where, data => {
        this.setState({
          places: data,
          shownPlaces: data,
          urlFilter: qstring.where
        });
      });
    } else {
      Database.getPlaces(data => {
        this.setState({
          places: data,
          shownPlaces: data,
        });
      });
    }
  }


  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps !== this.props ){
      this.setState({
        places: null,
        urlFilter: null
      });
      this.fetchData(nextProps.match.params.data, null);
    }
  }


  componentDidMount(){
    this.fetchData(this.props.match.params.data, this.props.location.search);
  }



  render() {
    return (
      <div className="maxHeight">
        <Header location={this.props.location} />
          <main role="main" className="maxHeight">

          <Sidebar id="sidebar" collapsed={this.state.sidebarCollapsed} selected={this.state.selected}
                   onOpen={this.onSidebarOpen.bind(this)} onClose={this.onSidebarClose.bind(this)}
                   closeIcon="fa fa-caret-left">
            <Tab id="home" header="Home" icon="fa fa-home">

              <UrlFilterButton urlFilter={ this.state.urlFilter } filter={ this.state.filter }/>
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

          <Map className="sidebar-map maxHeight" bounds={ this.getBounds() } zoomControl={true} ref="map">
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

              { this.state.places &&
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
