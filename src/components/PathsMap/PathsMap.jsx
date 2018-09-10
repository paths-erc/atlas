import React, { Component } from 'react';
import { Map, TileLayer, LayersControl, GeoJSON } from 'react-leaflet';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import qs from 'qs';
import hash from 'object-hash';
import { Sidebar, Tab } from 'react-leaflet-sidebarv2';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from "../mainLayout/Header"
import ListPlaces from './ListPlaces';
import UrlFilterButton from './UrlFilterButton';
import TabLegend from './TabLegend';
import TabSavedQueries from './TabSavedQueries';
import ClearButton from './ClearButton';

import Database from '../Services/Database/Database';

import './PathsMap.css';

const { BaseLayer } = LayersControl

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
    this.placesLayerRef = React.createRef();
    this.mapRef = React.createRef();
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

    // this.placesLayerRef.current.leafletElement.clearLayers();
    // this.placesLayerRef.current.leafletElement.addData(fgj);
    this.setState({
      manualFilter: str,
      shownPlaces: fgj
    });
    this.fitMapToBounds();
  }

  clearFiltered(){
    this.setState({
      manualFilter: '',
      shownPlaces: this.state.places
    });
    this.fitMapToBounds();
  }

  fitMapToBounds(){
    let bounds = [ [19.700194, 16.570227], [35.4737, 32.869317] ];
    if (this.placesLayerRef && this.placesLayerRef.current.props.data.features.length > 1){
      bounds = this.placesLayerRef.current.leafletElement.getBounds();
    }
    this.mapRef.current.leafletElement.fitBounds(bounds);
  }


  fetchData(savedQ, locationSearch){
    if (savedQ) {
      Database.getSaved('map', savedQ, null, data => {
        this.setState({
          places: data,
          shownPlaces: data,
          urlFilter: true
        });
        this.fitMapToBounds()
      });
    } else if (locationSearch) {
      let qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true})
      if (qstring.tb === 'manuscripts') {
        Database.getMsPlaces(qstring.where, data => {
          this.setState({
            places: data,
            shownPlaces: data,
            urlFilter: qstring.where
          });
          this.fitMapToBounds()
        });
      } else if (qstring.tb === 'places') {
        Database.getPlaces(qstring.where, data => {
          this.setState({
            places: data,
            shownPlaces: data,
            urlFilter: qstring.where
          });
          this.fitMapToBounds()
        });
      } else {
        return false;
      }

    } else {
      Database.getPlaces(null, data => {
        this.setState({
          places: data,
          shownPlaces: data,
        });
        this.fitMapToBounds();
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
                   closeIcon={<FontAwesomeIcon icon="caret-left" />}>
            <Tab id="home" header="Home" icon={<FontAwesomeIcon icon="home" />}>

              <div style={{ position: 'fixed', width: '380px', background: '#fff', marginTop: '2rem'}}>
                <InputGroup className="my-2">
                  <InputGroupAddon addonType="prepend">
                    Search:
                  </InputGroupAddon>
                  <Input type="search" value={this.state.manualFilter} onChange={this.filterPlaces.bind(this)} placeholder="start typing to filter places..." />
                    <ClearButton show={this.state.manualFilter} onClick={ this.clearFiltered.bind(this) } />
                </InputGroup>
              </div>

              <div style={{ marginTop: '6rem'}}>
                <UrlFilterButton urlFilter={ this.state.urlFilter } filter={ this.state.filter }/>
                <ListPlaces places={ this.state.shownPlaces } />
              </div>
            </Tab>

            <Tab id="savedQueries" header="Saved queries" icon={<FontAwesomeIcon icon="save" />}>
              <div className="mt-5">
                <TabSavedQueries />
              </div>
            </Tab>

            <Tab id="legend" header="Legend" icon={<FontAwesomeIcon icon="info" />} anchor="bottom">
              <div className="mt-5">
                <TabLegend />
              </div>
            </Tab>

          </Sidebar>

          <Map className="sidebar-map maxHeight" zoomControl={true} ref={this.mapRef}>
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
                    <GeoJSON
                      ref={this.placesLayerRef}
                      key={ hash(this.state.shownPlaces) }
                      data={this.state.shownPlaces}
                      pointToLayer={this.pointToLayer.bind(this)}
                      onEachFeature={this.onEachFeature.bind(this) } />
                }
            </LayersControl>

          </Map>
        </main>
      </div>
    );
  }
}
