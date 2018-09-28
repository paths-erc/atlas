import React, { Component } from 'react';
import qs from 'qs';

import SubHead from '../SubHead/SubHead';
import Results from './Results';
import SavedQueries from '../Services/SavedQueries';




export default class SearchSaved extends Component {

  constructor(props) {
    super(props);

    const qstring = qs.parse(props.location.search, {ignoreQueryPrefix: true});
    this.state = {
      saved: qstring.q,
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
        <SubHead tb={ this.props.match.params.table } text={SavedQueries[this.props.match.params.table][this.state.saved].title} />

      	<Results
            tb={this.props.match.params.table}
            query={this.state.saved}
            type="saved"
            page={this.state.page}
            />
      </div>
    );
  }
}
