import React, { Component } from 'react';
import qs from 'qs';

import PathsMapMain from './PathsMapMain';

import Database from '../Services/Database/Database';
import SavedQueries from '../Services/SavedQueries';

import './PathsMap.css';


export default class PathsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null,
      urlFilter: false
    };
  }

  fetchData(savedQ, locationSearch){
    if (savedQ) {
      Database.getData(SavedQueries[savedQ].url, SavedQueries[savedQ].data, data => {
        this.setState({
          places: data,
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
          urlFilter: qstring.where
        });
      });
    } else {
      Database.getPlaces(data => {
        this.setState({
          places: data
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
    if (this.state.places) {
      return <PathsMapMain places={ this.state.places } urlFilter={ this.state.urlFilter } />
    } else {
      return <div>Loading...</div>;
    }
  }
}
