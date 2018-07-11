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


  UNSAFE_componentWillReceiveProps(nextProps){

    if(nextProps !== this.props){
      this.setState({
        places: null,
        urlFilter: null
      });
      Database.getData(SavedQueries[nextProps.match.params.data].url, SavedQueries[nextProps.match.params.data].data, data => {
        this.setState({
          places: data,
          urlFilter: true
        });
      });
    }
  }


  componentDidMount(){
    if (
      typeof this.props.match.params !== 'undefined' &&
      this.props.match.params.action === 'saved' &&
      typeof SavedQueries[this.props.match.params.data] !== 'undefined'
    ) {

      Database.getData(SavedQueries[this.props.match.params.data].url, SavedQueries[this.props.match.params.data].data, data => {
        this.setState({
          places: data,
          urlFilter: true
        });
      });

    } else if (this.props.location.search) {

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
        this.setState({ places: data });
      });
    }
  }



  render() {
    if (this.state.places) {
      return <PathsMapMain places={ this.state.places } urlFilter={ this.state.urlFilter } />
    } else {
      return <div>Loading...</div>;
    }
  }
}
