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
import ShowError from '../ShowError/ShowError';

import SiteMaps from './SiteMaps';

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
      manualFilter: '',
      error: false,
      siteMaps: [],
      loadedSites: []
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
    const list = [
    	{
    		"n": "paths.places.104-Medinet-Madi/BGQ6JNX2-39",
    		"z": 22,
    		"c": [29.187713084722045, 30.645887794423942]
    	},
    	{
    		"n": "paths.places.53-Antinoupolis/BGQ6JNX2-53",
    		"z": 20,
    		"c": [27.804805651118542, 30.884793049007914]
    	},
    	{
    		"n": "paths.places.53-Antinoupolis/BGQ6JNX2-55",
    		"z": 20,
    		"c": [27.800021344980067, 30.886799300871274]
    	},
    	{
    		"n": "paths.places.53-Antinoupolis/BGQ6JNX2-54",
    		"z": 20,
    		"c": [27.805697423297435, 30.883554978308435]
    	},
    	{
    		"n": "paths.places.104-Medinet-Madi/BGQ6JNX2-40",
    		"z": 21,
    		"c": [29.190446292864074, 30.645202184111902]
    	},
    	{
    		"n": "paths.places.104-Medinet-Madi/BGQ6JNX2-41",
    		"z": 21,
    		"c": [29.190116487098024, 30.64613541004499]
    	},
    	{
    		"n": "paths.places.104-Medinet-Madi/BGQ6JNX2-42",
    		"z": 20,
    		"c": [29.190972759188547, 30.646467617008607]
    	},
    	{
    		"n": "paths.places.104-Medinet-Madi/BGQ6JNX2-43",
    		"z": 21,
    		"c": [29.189340490736054, 30.643205744556145]
    	},
    	{
    		"n": "paths.places.104-Medinet-Madi/BGQ6JNX2-44",
    		"z": 20,
    		"c": [29.192977992608427, 30.645290498255815]
    	},
    	{
    		"n": "paths.places.112-Monastery-of-Shenoute-at-Atripe/BGQ6JNX2-154",
    		"z": 20,
    		"c": [26.5342036060775, 31.6442502591251]
    	},
    	{
    		"n": "paths.places.113-Red-Monastery-at-Atripe/BGQ6JNX2-156",
    		"z": 21,
    		"c": [26.55461884509286, 31.61998551365044]
    	},
    	{
    		"n": "paths.places.114-Kellis/BGQ6JNX2-85",
    		"z": 21,
    		"c": [25.51541409579421, 29.096567848661103]
    	},
    	{
    		"n": "paths.places.115-Bagawat/BGQ6JNX2-86",
    		"z": 21,
    		"c": [25.48669784573843, 30.555114548921043]
    	},
    	{
    		"n": "paths.places.115-Bagawat/BGQ6JNX2-87",
    		"z": 21,
    		"c": [25.485700305307027, 30.555148501199593]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-103",
    		"z": 21,
    		"c": [30.843438195841582, 29.664018532295632]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-104",
    		"z": 21,
    		"c": [30.843438195841582, 29.664018532295632]
    	},
    	{
    		"n": "paths.places.58-Esna/BGQ6JNX2-169",
    		"z": 21,
    		"c": [25.25720467312582, 32.54782292766117]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-105",
    		"z": 22,
    		"c": [30.84353961444547, 29.663716841996493]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-21a1",
    		"z": 21,
    		"c": [30.84088541628571, 29.66256167706822]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-21a2",
    		"z": 21,
    		"c": [30.840885601026393, 29.662561570991272]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-21a3",
    		"z": 21,
    		"c": [30.84088450472146, 29.662561565637592]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-21b",
    		"z": 21,
    		"c": [30.84088450472146, 29.662561565637592]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-21b1",
    		"z": 21,
    		"c": [30.84088450472146, 29.662561565637592]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-22",
    		"z": 20,
    		"c": [30.84785278407858, 29.662086178505934]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-28b",
    		"z": 21,
    		"c": [30.84195651613142, 29.664850637490858]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-30",
    		"z": 21,
    		"c": [30.842633232930766, 29.65911461973712]
    	},
    	{
    		"n": "paths.places.116-Abu-Mina/BGQ6JNX2-31",
    		"z": 21,
    		"c": [30.841368754913667, 29.66300427312458]
    	},
    	{
    		"n": "paths.places.119-Dionysias/BGQ6JNX2-46",
    		"z": 22,
    		"c": [29.40325610322086, 30.422296439498176]
    	},
    	{
    		"n": "paths.places.122-Hawara/BGQ6JNX2-49",
    		"z": 22,
    		"c": [29.275638761445162, 30.897718186054327]
    	},
    	{
    		"n": "paths.places.143-Marea/BGQ6JNX2-9",
    		"z": 20,
    		"c": [30.99640560875678, 29.656863370514802]
    	},
    	{
    		"n": "paths.places.16-Elephantine/BGQ6JNX2-186",
    		"z": 19,
    		"c": [24.084247780038762, 32.88639600397803]
    	},
    	{
    		"n": "paths.places.16-Elephantine/BGQ6JNX2-77",
    		"z": 19,
    		"c": [24.084247780038762, 32.88639600397803]
    	},
    	{
    		"n": "paths.places.169-Manqabad/BGQ6JNX2-144",
    		"z": 21,
    		"c": [27.18215857083099, 31.11543848821127]
    	},
    	{
    		"n": "paths.places.58-Esna/BGQ6JNX2-76",
    		"z": 21,
    		"c": [25.29353440413271, 32.55645642663842]
    	},
    	{
    		"n": "paths.places.169-Manqabad/BGQ6JNX2-145",
    		"z": 21,
    		"c": [27.182475722183746, 31.112559788881956]
    	},
    	{
    		"n": "paths.places.173-Dakhleh/BGQ6JNX2-181",
    		"z": 21,
    		"c": [25.66885216564107, 28.870803633631088]
    	},
    	{
    		"n": "paths.places.176-Deir abu Matta/BGQ6JNX2-180",
    		"z": 21,
    		"c": [25.59377898002804, 28.9121434938785]
    	},
    	{
    		"n": "paths.places.182-Karnak/BGQ6JNX2-166",
    		"z": 19,
    		"c": [25.717780361101507, 32.6595160667346]
    	},
    	{
    		"n": "paths.places.182-Karnak/BGQ6JNX2-167",
    		"z": 19,
    		"c": [25.717780361101507, 32.6595160667346]
    	},
    	{
    		"n": "paths.places.188-Pharan/BGQ6JNX2-96a",
    		"z": 22,
    		"c": [28.704848982709343, 33.63482147864396]
    	},
    	{
    		"n": "paths.places.188-Pharan/BGQ6JNX2-96b",
    		"z": 22,
    		"c": [28.704848982709343, 33.63482147864396]
    	},
    	{
    		"n": "paths.places.188-Pharan/BGQ6JNX2-97",
    		"z": 20,
    		"c": [28.705347801871415, 33.63495371489594]
    	},
    	{
    		"n": "paths.places.19-Luxor-complex/BGQ6JNX2-69",
    		"z": 21,
    		"c": [25.701256443006596, 32.64115390712226]
    	},
    	{
    		"n": "paths.places.19-Luxor-complex/BGQ6JNX2-70",
    		"z": 21,
    		"c": [25.699852781295732, 32.63888319155756]
    	},
    	{
    		"n": "paths.places.19-Luxor-complex/BGQ6JNX2-71",
    		"z": 20,
    		"c": [25.700143901286207, 32.64001806277448]
    	},
    	{
    		"n": "paths.places.20-Koptos/BGQ6JNX2-64",
    		"z": 22,
    		"c": [25.996230777036267, 32.81373241040219]
    	},
    	{
    		"n": "paths.places.68-Pbou/BGQ6JNX2-162b",
    		"z": 20,
    		"c": [26.112588250912747, 32.40311080332181]
    	},
    	{
    		"n": "paths.places.74-Naqlun/BGQ6JNX2-131b",
    		"z": 22,
    		"c": [29.19505890878909, 30.878506347361654]
    	},
    	{
    		"n": "paths.places.74-Naqlun/BGQ6JNX2-131a",
    		"z": 22,
    		"c": [29.19505890878909, 30.878506347361654]
    	},
    	{
    		"n": "paths.places.74-Naqlun/BGQ6JNX2-131c",
    		"z": 22,
    		"c": [29.195058998138123, 30.878507159650326]
    	},
    	{
    		"n": "paths.places.78-Kellia/BGQ6JNX2-114",
    		"z": 21,
    		"c": [30.780959394377504, 30.36481238334848]
    	},
    	{
    		"n": "paths.places.78-Kellia/BGQ6JNX2-115",
    		"z": 21,
    		"c": [30.78101741247412, 30.367026588603107]
    	},
    	{
    		"n": "paths.places.78-Kellia/BGQ6JNX2-116",
    		"z": 20,
    		"c": [30.780327477596863, 30.368028812951334]
    	},
    	{
    		"n": "paths.places.78-Kellia/BGQ6JNX2-117",
    		"z": 20,
    		"c": [30.780327477596863, 30.368028812951334]
    	},
    	{
    		"n": "paths.places.88-Petemout/BGQ6JNX2-66",
    		"z": 21,
    		"c": [25.734482729225938, 32.70913503127934]
    	},
    	{
    		"n": "paths.places.88-Petemout/BGQ6JNX2-67",
    		"z": 21,
    		"c": [25.734125554949877, 32.71016965934224]
    	},
    	{
    		"n": "paths.places.96-Philae/BGQ6JNX2-78",
    		"z": 20,
    		"c": [24.026162711796047, 32.88471292369061]
    	},
    	{
    		"n": "paths.places.96-Philae/BGQ6JNX2-79",
    		"z": 20,
    		"c": [24.026162711796047, 32.88471292369061]
    	},
    	{
    		"n": "paths.places.96-Philae/BGQ6JNX2-80",
    		"z": 21,
    		"c": [24.02560660684249, 32.88407618774808]
    	},
    	{
    		"n": "paths.places.21-Dendera/BGQ6JNX2-58",
    		"z": 20,
    		"c": [27.77922774421122, 30.80270035746382]
    	},
    	{
    		"n": "paths.places.21-Dendera/BGQ6JNX2-63",
    		"z": 21,
    		"c": [26.142846800838385, 32.67027365056673]
    	},
    	{
    		"n": "paths.places.215-Deir-Abu-Hennes/BGQ6JNX2-141",
    		"z": 21,
    		"c": [27.786862075230307, 30.90470231457129]
    	},
    	{
    		"n": "paths.places.217-Deir-al-Dik/BGQ6JNX2-51",
    		"z": 21,
    		"c": [27.829442770562405, 30.86180866253168]
    	},
    	{
    		"n": "paths.places.24-Panopolis/BGQ6JNX2-159",
    		"z": 21,
    		"c": [26.598300544535153, 31.79157930250137]
    	},
    	{
    		"n": "paths.places.24-Panopolis/BGQ6JNX2-161",
    		"z": 21,
    		"c": [26.477690475121953, 31.820103846838318]
    	},
    	{
    		"n": "paths.places.338-Taposiris-Magna/BGQ6JNX2-185",
    		"z": 18,
    		"c": [30.94613861050185, 29.518677935874415]
    	},
    	{
    		"n": "paths.places.338-Taposiris-Magna/BGQ6JNX2-4",
    		"z": 20,
    		"c": [30.941986991898826, 29.522353874906862]
    	},
    	{
    		"n": "paths.places.338-Taposiris-Magna/BGQ6JNX2-5",
    		"z": 19,
    		"c": [30.942163347265492, 29.514647906219466]
    	},
    	{
    		"n": "paths.places.338-Taposiris-Magna/taposiris",
    		"z": 19,
    		"c": [30.942163347265492, 29.514647906219466]
    	},
    	{
    		"n": "paths.places.36-Pelusium/BGQ6JNX2-189",
    		"z": 17,
    		"c": [31.042570283455497, 32.5400549810067]
      },
    	{
    		"n": "paths.places.36-Pelusium/BGQ6JNX2-88",
    		"z": 17,
    		"c": [31.042570283455497, 32.5400549810067]
    	},
    	{
    		"n": "paths.places.36-Pelusium/BGQ6JNX2-89",
    		"z": 20,
    		"c": [31.042295517396344, 32.55677972073124]
    	},
    	{
    		"n": "paths.places.36-Pelusium/BGQ6JNX2-90",
    		"z": 21,
    		"c": [31.04182432955881, 32.55712329743325]
    	},
    	{
    		"n": "paths.places.368-Upper-Ansina/BGQ6JNX2-137",
    		"z": 20,
    		"c": [27.798181397632575, 30.890187864330862]
    	},
    	{
    		"n": "paths.places.368-Upper-Ansina/BGQ6JNX2-138",
    		"z": 20,
    		"c": [27.798181397632575, 30.890187864330862]
    	},
    	{
    		"n": "paths.places.368-Upper-Ansina/BGQ6JNX2-139",
    		"z": 19,
    		"c": [27.798209463938218, 30.895134920255376]
    	},
    	{
    		"n": "paths.places.368-Upper-Ansina/BGQ6JNX2-56",
    		"z": 20,
    		"c": [27.80102610168583, 30.88937311272564]
    	},
    	{
    		"n": "paths.places.374-Deir-el-Matmar/BGQ6JNX2-168",
    		"z": 21,
    		"c": [25.645374000611568, 32.45618138907984]
    	},
    	{
    		"n": "paths.places.38-Alexandria/BGQ6JNX2-1",
    		"z": 20,
    		"c": [31.19784616916719, 29.902649609223268]
    	},
    	{
    		"n": "paths.places.53-Antinoupolis/BGQ6JNX2-52",
    		"z": 21,
    		"c": [27.810324304595852, 30.881748393073345]
    	},
    	{
    		"n": "paths.places.113-Red-Monastery-at-Atripe/BGQ6JNX2-155",
    		"z": 20,
    		"c": [26.554759495305074, 31.61991702381268]
    	},
    	{
    		"n": "paths.places.70-Hermonthis/BGQ6JNX2-74",
    		"z": 20,
    		"c": [25.6213456308842, 32.54525094474053]
    	},
    	{
    		"n": "paths.places.24-Panopolis/BGQ6JNX2-160",
    		"z": 20,
    		"c": [26.548895680414724, 31.815046089715846]
    	},
    	{
    		"n": "paths.places.28-Hermopolis-Magna/BGQ6JNX2-59",
    		"z": 20,
    		"c": [26.548895680414724, 31.815046089715846]
    	}
    ];
    const bounds = this.mapRef.current.leafletElement.getBounds();
    const zoom = e.zoom;
    const $this = this;

    list.map(e => {
      if (zoom >= e.z - 5 && bounds.contains(e.c)){
        fetch(`https://docs.paths-erc.eu/data/geojson/${e.n}.geojson`).then( function(response){
          response.json().then(function(j){
            if ($this.state.loadedSites.includes(e.n)){
              return;
            }

            let added = $this.state.siteMaps;
            added.push(j);

            let loaded = $this.state.loadedSites;
            loaded.push(e.n);

            $this.setState({
              siteMaps: added,
              loadedSites: loaded
            });
          });
        });
      }
      return true;
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

          {this.state.error && <ShowError>{this.state.error}</ShowError>}

          { !this.state.shownPlaces && <div style={{ position: 'absolute', top: '5rem', textAlign: 'center', zIndex: 999, width: '100%'}}>
                <Loading>Loading map data...</Loading>
              </div> }

          <Map className="sidebar-map maxHeight" zoomControl={true} ref={this.mapRef} onViewportChanged={ this.onViewportChanged.bind(this) }>
            <LayersControl position="topright">
              { /**
              <BaseLayer name="Imperium (Pelagios)">
                <TileLayer url="http://pelagios.org/tilesets/imperium/{z}/{x}/{y}.png" />
              </BaseLayer>
              */ }
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
                onEachFeature={this.onEachFeature.bind(this) }
                /> }

              <SiteMaps siteMaps={this.state.siteMaps} />

            </LayersControl>

          </Map>
        </main>
      </div>
    );
  }
}
