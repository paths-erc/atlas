import React, { Component } from 'react';
import { Map, TileLayer, LayersControl, GeoJSON, WMSTileLayer } from 'react-leaflet';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import qs from 'qs';
import hash from 'object-hash';
import { Sidebar, Tab } from 'react-leaflet-sidebarv2';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleLayer } from 'react-leaflet-google';


import Header from "../mainLayout/Header"
import ListPlaces from './ListPlaces';
import UrlFilterButton from './UrlFilterButton';
import TabLegend from './TabLegend';
import TabSavedQueries from './TabSavedQueries';
import ClearButton from './ClearButton';
import Loading from '../Loading/Loading';

import Database from '../Services/Database/Database';

import './PathsMap.css';

const { BaseLayer } = LayersControl

const googleKey = "AIzaSyCLRylxZwGnCbbDE7pH-oUURTZHOre7h5o";
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
    let col = '#0f4880'; // 15, 72, 128

    if (t.properties.type){

      // discovery && storage && production
      if (t.properties.type.includes('discovery') && t.properties.type.includes('storage') && t.properties.type.includes('production')) {
        col = '#939393'; //147, 147, 147

      // dicovery && storage
      } else if (t.properties.type.includes('discovery') && t.properties.type.includes('storage')) {
        col = '#00aa55'; // rgb 0,170,85

      // storage && production
      } else if (t.properties.type.includes('storage') && t.properties.type.includes('production')) {
        col = '#009fd4'; // 0, 159, 212

      // dicovery && production
      } else if (t.properties.type.includes('discovery') && t.properties.type.includes('production')) {
        col = '#b381b3'; // 179, 129, 179

      // discovery
      } else if (t.properties.type.includes('discovery')){
        col = '#aa8f00'; // 170, 143, 0

      // storage
      } else if (t.properties.type.includes('storage')) {
        col = '#d47500'; // 212, 117, 0

      // production
      } else if (t.properties.type.includes('production')) {
        col = '#f64747'; // 246, 71, 71
      }
    }

    return new L.CircleMarker(i, {
      radius: 5,
      weight: 1,
      color: "#fff",
      opacity: 0.9,
      fillColor: col,
      fillOpacity: 1
    })
  }

  onEachFeature(feature, layer){
    const base = window.location.pathname.replace(/\/map(.*)/, '');
    layer.bindPopup(`<strong>${feature.properties.name}</strong>` +
       (feature.properties.copticname ? '<br /><span class="coptic">' + feature.properties.copticname + '</span>': '') +
       (feature.properties.type ? `<br /><span class="text-secondary">${feature.properties.type}</span>` : '') +
       `<br /><a href="${base}/places/${feature.properties.id}">paths/places/${feature.properties.id}</a>`
    );
    layer.on('mouseover', function() { layer.openPopup(); });
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

      if(bounds._northEast.lat === bounds._southWest.lat && bounds._northEast.lng === bounds._southWest.lng){
        bounds.pad();
      }
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

  showGeoJson(){
    if (!this.state.shownPlaces){
      return <div style={{ textAlign: 'center', zIndex: 999, marginTop: '5rem'}}>
          <Loading>Loading map data...</Loading>
        </div>
    }
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

              <div className="sidebarSearch">
                <InputGroup className="my-2">
                  <InputGroupAddon addonType="prepend">
                    Search:
                  </InputGroupAddon>
                  <Input type="search" value={this.state.manualFilter} onChange={this.filterPlaces.bind(this)} placeholder="start typing to filter places..." />
                    <ClearButton show={this.state.manualFilter} onClick={ this.clearFiltered.bind(this) } />
                </InputGroup>
              </div>

              <div className="mt-2">
                <UrlFilterButton urlFilter={ this.state.urlFilter } filter={ this.state.filter }/>
                <ListPlaces places={ this.state.shownPlaces } />
              </div>
            </Tab>

            <Tab id="savedQueries" header="Saved queries" icon={<FontAwesomeIcon icon="save" />}>
              <div className="mt-5">
                <TabSavedQueries />
              </div>
            </Tab>

            <Tab id="legend" header="Legend" icon={<FontAwesomeIcon icon="info" />}>
              <div className="mt-5">
                <TabLegend />
              </div>
            </Tab>
          </Sidebar>

          { !this.state.shownPlaces && <div style={{ position: 'absolute', top: '5rem', textAlign: 'center', zIndex: 999, width: '100%'}}>
                <Loading>Loading map data...</Loading>
              </div> }

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
              <BaseLayer name='Google Maps Roads'>
                 <GoogleLayer googlekey={googleKey}  maptype='ROADMAP'/>
              </BaseLayer>

              <BaseLayer name='Google Satellite'>
               <GoogleLayer googlekey={googleKey}  maptype='SATELLITE'/>
              </BaseLayer>
              <BaseLayer name="OpenStreetMap">
                <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              </BaseLayer>
              <BaseLayer name="Series 4085 - GB &amp; USA">
                <WMSTileLayer
                  layers='Series 4085-Great Britain War Office-U.S. Army Map Service-1941-'
                  url="http://wms.paths-erc.eu/"
                />
              </BaseLayer>
              <BaseLayer name="Arrowsmith 1807">
                <WMSTileLayer
                  layers='Arrowsmith 1807'
                  url="http://wms.paths-erc.eu/"
                />
              </BaseLayer>

              { this.state.shownPlaces && <GeoJSON
                ref={this.placesLayerRef}
                key={ hash(this.state.shownPlaces) }
                data={this.state.shownPlaces}
                pointToLayer={this.pointToLayer.bind(this)}
                onEachFeature={this.onEachFeature.bind(this) } /> }
            </LayersControl>

          </Map>
        </main>
      </div>
    );
  }
}
