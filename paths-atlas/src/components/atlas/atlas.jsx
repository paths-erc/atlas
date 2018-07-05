import React, { Component } from 'react';
import { Map, TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { Sidebar, Tab } from 'react-leaflet-sidebarv2';
import L from 'leaflet';

import Header from "../mainLayout/header/header"
import Database from '../Services/Database/Database';
import ListPlaces from './ListPlaces';





import './atlas.css';

const { BaseLayer, Overlay } = LayersControl



export default class Atlas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selected: 'home',
      places: null,
      filteredPlaces: false
    };
  }

  onClose() {
    this.setState({collapsed: true});
  }
  onOpen(id) {
    this.setState({
      collapsed: false,
      selected: id,
    })
  }

  componentDidMount(){
    Database.getPlaces(data => {
      this.setState({ places: data });
    });
  }

  pointToLayer(t, i) {
    return new L.CircleMarker(i, {
      radius: 5,
      weight: 1,
      color: "#000",
      opacity: 0.9,
      fillColor: "#0000ff",
      fillOpacity: 0.5
    })
  }

  onEachFeature(feature, layer){
    layer.bindPopup(
      '<strong>' + feature.properties.name + '</strong>' +
       (feature.properties.copticname ? '<br><span class="coptic">' + feature.properties.copticname + '</span>': '') +
       '<br>' +
       '<a href="../read/places/' + feature.properties.id + '">paths/places/' + feature.properties.id +'</a>'
    );
  }

  filterPlacesByIdArray(ids) {
    let filteredPlaces = [];

    this.refs.places.leafletElement.eachLayer( (layer) => {
      if (ids.indexOf(layer.feature.properties.id) > -1) {
        layer.getElement().style.display = 'inline';
        filteredPlaces.push(layer.feature.properties);
      } else {
        layer.getElement().style.display = 'none';
      }
    });

    this.setState({ filteredPlaces: filteredPlaces });
  }

  filterPlaces(e) {
    const searchKey = e.target.value;

    let filteredPlaces = [];

    this.refs.places.leafletElement.eachLayer( (layer) => {
      let found = false;
      for (const value of Object.values(layer.feature.properties)) {
        if (value && value.toLowerCase().includes(searchKey.toLowerCase())){
          found = true;
        }
      }
      if (found || searchKey === ''){
        layer.getElement().style.display = 'inline';
        filteredPlaces.push(layer.feature.properties);
      } else {
        layer.getElement().style.display = 'none';
      }
    });
    this.setState({ filteredPlaces: filteredPlaces });

  }

  render() {
    return (
      <div className="maxHeight">
        <Header location={this.props.location} />
          <main role="main" className="maxHeight">

          <Sidebar id="sidebar" collapsed={this.state.collapsed} selected={this.state.selected}
                   onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}
                   closeIcon="fa fa-caret-left">
            <Tab id="home" header="Home" icon="fa fa-home">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  Search:
                </InputGroupAddon>
                <Input type="search" onChange = {this.filterPlaces.bind(this)} placeholder="start typing to filter places..." />
              </InputGroup>

              <ListPlaces filteredPlaces={ this.state.filteredPlaces } />

            </Tab>
            <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
              <p>Settings dialogue.</p>
            </Tab>
          </Sidebar>

          <Map className="sidebar-map maxHeight" center={[29.501768632523262, 31.453857421875004]} zoom={6} zoomControl={true} ref="map">
            <LayersControl position="topright">
              <BaseLayer name="Imperium (Pelagios)" checked={true}>
                <TileLayer url="http://pelagios.org/tilesets/imperium/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="Imperium (DARE)">
                <TileLayer url="http://dare.ht.lu.se/tiles/imperium/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="AWMC">
                <TileLayer url="http://{s}.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="OpenStreetMap">
                <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              </BaseLayer>

              { this.state.places !== null &&
              <Overlay name="Places" checked={true}>
                <GeoJSON ref="places" data={this.state.places} pointToLayer={this.pointToLayer.bind(this)} onEachFeature={this.onEachFeature.bind(this) } />
              </Overlay>
            }
            </LayersControl>

          </Map>
        </main>
      </div>
    );
  }
}
