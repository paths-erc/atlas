import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Database from '../Services/Database/Database';
import ChartList from './ChartList';


export default class Charts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartList: false
    };
  }

  componentDidMount(prevProps, prevState){
    Database.getChart('all', d => {
      this.setState({ chartList: d });
    });
  }


  render(){
    return (
      <div className="container mt-5">
        <h1><FontAwesomeIcon icon="chart-bar" /> Available charts</h1>
        <ChartList charts={this.state.chartList} />
      </div>
    );
  }
}
