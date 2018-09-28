import React, { Component } from 'react';
import qs from 'qs';

import SubHead from '../SubHead/SubHead';
import CustomSearchForm from './CustomSearchForm';
import Results from './Results';



export default class SearchSimple extends Component {

  constructor(props) {
    super(props);

    const qstring = qs.parse(props.location.search, {ignoreQueryPrefix: true});
    this.state = {
      fld: qstring.f,
      val: qstring.v,
      strict: (qstring.s && qstring.s !== 'false' && qstring.s !== 'undefined'),
      page: qstring.page
    };

    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  _onFormSubmit(fld, val, strict){
    const s = "f=" + encodeURIComponent(fld) +
                  (strict ? "&s=1" : '')+
                  "&v=" + encodeURIComponent(val);

    this.setState({
      fld: fld,
      val: val,
      strict: strict
    });

    this.props.history.push(`/search/${this.props.match.params.table}?${s}`);
  }

  componentDidUpdate(prevProps, prevState) {
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
        <SubHead tb={ this.props.match.params.table } text='Simple search' />

      	<div className="mt-3 p-1 container">
          <CustomSearchForm
              tb={ this.props.match.params.table }
              onSubmit={this._onFormSubmit}
              fld={this.state.fld}
              val={this.state.val}
              strict={this.state.strict}
             />
          <hr />
  		  </div>

        { this.state.fld && this.state.val && <Results
            tb={this.props.match.params.table}
            type="simple"
            fld={this.state.fld}
            val={this.state.val}
            strict={this.state.strict}
            page={this.state.page}
            />}
      </div>
    );
  }
}
