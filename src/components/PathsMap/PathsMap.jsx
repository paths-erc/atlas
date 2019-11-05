import React, { Component } from 'react';
import { Map } from 'react-leaflet';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import qs from 'qs';
import { Sidebar, Tab } from 'react-leaflet-sidebarv2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import Header from "../mainLayout/Header"
import ListPlaces from './ListPlaces';
import UrlFilterButton from './UrlFilterButton';
import Legend from './Tabs/Legend';
import MapSavedQueries from './Tabs/MapSavedQueries';
import ClearButton from './ClearButton';
import Loading from '../Loading/Loading';
import ShowError from '../ShowError/ShowError';

import Layers from './Map/Layers';

import Database from '../Services/Database/Database';

import './PathsMap.css';



export default class PathsMap extends Component {

  constructor(props) {

    super(props);
    this.state = {
      places: null,
      shownPlaces: null,
      urlFilter: false,
      sidebarCollapsed: false,
      selected: 'home',
      manualFilter: '',
      error: false,
      mapBounds: false,
      zoom: false,
      geoJsonBounds: false
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
    if (this.state.geoJsonBounds && bounds._northEast && bounds._southWest){
      bounds = this.state.geoJsonBounds;
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
        if (data.type && data.type === 'error') {
          this.setState({
            error: <div>Sorry. There was an error in getting the data from database. Please report this error to <a href="mailto:julian.bogdani@uniroma1.it">julian.bogdani@uniroma1.it</a> and be sure to copy and paste the following lines:<br /><div className="border p-3 mt-3"><code>{window.location.href}</code><pre>{data.text}</pre></div></div>
          });
          return;
        }
        this.setState({
          places: data,
          shownPlaces: data,
        });
        this.fitMapToBounds();
      });
    }
  }

  onViewportChanged(e){
    const mapBounds = this.mapRef.current.leafletElement.getBounds();
    const zoom = e.zoom;
    this.setState({
      mapBounds: mapBounds,
      zoom: zoom
    });
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
  onAddgeoJson(e){
    this.setState({
      geoJsonBounds: e.target.getBounds()
    });
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
                <MapSavedQueries />
              </div>
            </Tab>

            <Tab id="legend" header="Legend" icon={<FontAwesomeIcon icon="info" />}>
              <div className="mt-5">
                <Legend />
              </div>
            </Tab>
          </Sidebar>

          {this.state.error && <ShowError>{this.state.error}</ShowError>}

          { !this.state.shownPlaces && <div style={{ position: 'absolute', top: '5rem', textAlign: 'center', zIndex: 999, width: '100%'}}>
                <Loading>Loading map data...</Loading>
              </div>
          }

          <Map
              className="sidebar-map maxHeight"
              zoomControl={true}
              ref={this.mapRef}
              onViewportChanged={ this.onViewportChanged.bind(this) }
              >

          <Layers
              shownPlaces={ this.state.shownPlaces }
              onAdd={this.onAddgeoJson.bind(this) }
              mapBounds={this.state.mapBounds}
              zoom={this.state.zoom}
            />
          </Map>
        </main>
      </div>
    );
  }
}
