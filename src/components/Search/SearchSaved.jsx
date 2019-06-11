import React, { Component } from 'react';
import { Alert } from 'reactstrap';
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
    const old_qstring = qs.parse(prevProps.location.search, {ignoreQueryPrefix: true});
    const new_qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});

    if(old_qstring.page !== new_qstring.page){
      this.setState({
        page: new_qstring.page
      });
    }
    if(old_qstring.q !== new_qstring.q){
      this.setState({
        saved: new_qstring.q
      });
    }
  }

  render() {
    if (typeof SavedQueries[this.props.match.params.table][this.state.saved] === 'undefined'){
      return (
        <div className="container">
          <Alert color="warning" className="mt-5">
              <h4 className="alert-heading">Ooops!</h4>
              No saved query <code>{this.state.saved}</code> found.
          </Alert>
        </div>
      );
    }
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
