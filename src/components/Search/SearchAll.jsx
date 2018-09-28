import React, { Component } from 'react';
import qs from 'qs';

import SubHead from '../SubHead/SubHead';
import Results from './Results';



export default class SearchAll extends Component {

  constructor(props) {
    super(props);

    const qstring = qs.parse(props.location.search, {ignoreQueryPrefix: true});
    this.state = {
      page: qstring.page
    };
  }

  componentDidUpdate(prevProps, prevState){
    const qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    if(this.state.page !== qstring.page){
      this.setState({
        page: qstring.page
      });
    }
  }

  render() {
    return (
      <div>
        <SubHead tb={ this.props.match.params.table } text='View all' />

      	<Results
            tb={this.props.match.params.table}
            type="all"
            page={this.state.page}
            />
      </div>
    );
  }
}
