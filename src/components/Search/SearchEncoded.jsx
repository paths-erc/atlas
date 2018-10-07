import React, { Component } from 'react';
import qs from 'qs';

import SubHead from '../SubHead/SubHead';
  import Results from './Results';



export default class SearchSimple extends Component {


  render() {
    const qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});

    return (
      <div>
        <SubHead tb={ this.props.match.params.table } text='Custom query' />
        <Results
            tb={this.props.match.params.table}
            type="encoded"
            q={qstring.q}
            page={qstring.page}
            />
      </div>
    );
  }
}
