import React, { Component } from 'react';
import { Map, ZoomControl } from 'react-leaflet';
import { InputGroup, Input } from 'reactstrap';
import qs from 'qs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from "../mainLayout/Header"
import MapSidebar from './MapSidebar';
import SidebarPortal from './SidebarPortal';
import ListPlaces from './ListPlaces';
import UrlFilterButton from './UrlFilterButton';
import Legend from './Tabs/Legend';
import MapSavedQueries from './Tabs/MapSavedQueries';
import ClearButton from './ClearButton';
import Loading from '../Loading/Loading';
import ShowError from '../ShowError/ShowError';
import Layers from './Map/Layers';

import Database from '../Services/Database/Database';
import SavedQueries from '../Services/SavedQueries';

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
    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(id) {
    if (id === null) {
      this.setState(s => ({ sidebarCollapsed: !s.sidebarCollapsed }));
    } else if (id === this.state.selected && !this.state.sidebarCollapsed) {
      this.setState({ sidebarCollapsed: true });
    } else {
      this.setState({ selected: id, sidebarCollapsed: false });
    }
  }

  filterPlaces(e) {
    const str = e.target.value;
    let fgj;
    if (str === '') {
      fgj = this.state.places;
    } else {
      fgj = { type: 'FeatureCollection', features: [] };
      for (const val of Object.values(this.state.places.features)) {
        if (Object.values(val.properties).join('|').toLowerCase().includes(str.toLowerCase())) {
          fgj.features.push(val);
        }
      }
    }
    this.setState({ manualFilter: str, shownPlaces: fgj });
    this.fitMapToBounds();
  }

  clearFiltered() {
    this.setState({ manualFilter: '', shownPlaces: this.state.places });
    this.fitMapToBounds();
  }

  fitMapToBounds() {
    let bounds = [ [19.700194, 16.570227], [35.4737, 32.869317] ];
    if (this.state.geoJsonBounds && bounds._northEast && bounds._southWest) {
      bounds = this.state.geoJsonBounds;
      if (bounds._northEast.lat === bounds._southWest.lat && bounds._northEast.lng === bounds._southWest.lng) {
        bounds.pad();
      }
    }
    this.mapRef.current.leafletElement.fitBounds(bounds);
  }

  fetchData(savedQ, locationSearch) {
    const onGeoData = (data) => {
      if (!data || data.status === 'error') {
        this.setState({
          error: <div>Sorry. There was an error loading map data. Please report this to <a href="mailto:julian.bogdani@uniroma1.it">julian.bogdani@uniroma1.it</a>.</div>
        });
        return;
      }
      this.setState({ places: data, shownPlaces: data });
      this.fitMapToBounds();
    };

    if (savedQ) {
      const sq = SavedQueries.map && SavedQueries.map[savedQ];
      Database.getPlaces(sq ? sq.filter : null, data => {
        if (!data || data.status === 'error') { onGeoData(data); return; }
        this.setState({ places: data, shownPlaces: data, urlFilter: true });
        this.fitMapToBounds();
      });
    } else if (locationSearch) {
      const qstring = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      const filter = qstring.filter ? JSON.parse(qstring.filter) : null;
      if (qstring.tb === 'manuscripts') {
        Database.getMsPlaces(filter, data => {
          if (!data || data.status === 'error') { onGeoData(data); return; }
          this.setState({ places: data, shownPlaces: data, urlFilter: !!filter });
          this.fitMapToBounds();
        });
      } else if (qstring.tb === 'places') {
        Database.getPlaces(filter, onGeoData);
      } else {
        Database.getPlaces(null, onGeoData);
      }
    } else {
      Database.getPlaces(null, onGeoData);
    }
  }

  onViewportChanged(e) {
    const mapBounds = this.mapRef.current.leafletElement.getBounds();
    this.setState({ mapBounds, zoom: e.zoom });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ places: null, urlFilter: null });
      this.fetchData(nextProps.match.params.data, null);
    }
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.data, this.props.location.search);
  }

  onAddgeoJson(e) {
    this.setState({ geoJsonBounds: e.target.getBounds() });
  }

  render() {
    const tabs = [
      {
        id: 'home',
        header: 'Places',
        icon: <FontAwesomeIcon icon="home" />,
        content: (
          <div>
            <InputGroup className="my-2">
              <span className="input-group-text">Search:</span>
              <Input
                type="search"
                value={this.state.manualFilter}
                onChange={this.filterPlaces.bind(this)}
                placeholder="filter places…"
              />
              <ClearButton show={this.state.manualFilter} onClick={this.clearFiltered.bind(this)} />
            </InputGroup>
            <UrlFilterButton urlFilter={this.state.urlFilter} filter={this.state.filter} />
            <ListPlaces places={this.state.shownPlaces} />
          </div>
        )
      },
      {
        id: 'savedQueries',
        header: 'Saved queries',
        icon: <FontAwesomeIcon icon="save" />,
        content: <MapSavedQueries />
      },
      {
        id: 'legend',
        header: 'Legend',
        icon: <FontAwesomeIcon icon="info" />,
        content: <Legend />
      }
    ];

    return (
      <div className="maxHeight">
        <Header location={this.props.location} />
        <main role="main" className="maxHeight">

          {this.state.error && <ShowError>{this.state.error}</ShowError>}

          <Map
            className="maxHeight"
            zoomControl={false}
            ref={this.mapRef}
            onViewportChanged={this.onViewportChanged.bind(this)}
            maxZoom="25"
          >
            <ZoomControl position="topright" />

            <SidebarPortal>
              <MapSidebar
                tabs={tabs}
                activeTab={this.state.selected}
                collapsed={this.state.sidebarCollapsed}
                onTabClick={this.onTabClick}
              />
            </SidebarPortal>

            {!this.state.shownPlaces && (
              <div style={{ position: 'absolute', top: '5rem', textAlign: 'center', zIndex: 999, width: '100%' }}>
                <Loading>Loading map data...</Loading>
              </div>
            )}

            <Layers
              shownPlaces={this.state.shownPlaces}
              onAdd={this.onAddgeoJson.bind(this)}
              mapBounds={this.state.mapBounds}
              zoom={this.state.zoom}
            />
          </Map>
        </main>
      </div>
    );
  }
}
