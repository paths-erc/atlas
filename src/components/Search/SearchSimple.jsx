import React, { Component } from 'react';
import qs from 'qs';

import Database from '../Services/Database/Database';
import SubHead from '../SubHead/SubHead';
import CustomSearchForm from './CustomSearchForm';
import Loading from '../Loading/Loading';
import Results from './Results';



export default class SearchSimple extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orm: true,
      fld: false,
      val: false,
      strict: false,
      page: false,
      tb_label: null,
      fields: null,
      selectedFld: null
    };

    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  _onFormSubmit(fld, val, strict){
    const s = "f=" + encodeURIComponent(fld) +
                  "&s=" + encodeURIComponent(strict) +
                  "&v=" + encodeURIComponent(val)
    this.props.history.push(`/search/${this.props.match.params.table}?${s}`);
    this.setState({
      fld: fld,
      val: val,
      strict: strict
    });
  }

  _setFromQs(){
    const qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});

    if (qstring.f && qstring.v){
      this.setState({
        fld: qstring.f,
        val: qstring.v,
        strict: (qstring.s && qstring.s !== 'false'),
        page: qstring.page
      });
    } else {
      this.setState({
        fld: false,
        val: false,
        strict: false,
      });
    }
  }
  componentDidUpdate(prevProps) {
    const qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    if(this.state.page !== qstring.page){
      this.setState({
        page: qstring.page
      });
    }

  }

  componentDidMount(){
    this._setFromQs();
    Database.inspect(this.props.match.params.table, data => {
      this.setState({
        fields: data.fields,
        tb_label: data.label
      });
    });
  }

  render() {
    if (!this.state.fields) {
      return <div className="m-5 p-5"><Loading /></div>;
    }

    return (
      <div>
        <SubHead tb={ this.props.match.params.table } tblabel={ this.state.tb_label } text='Simple search' />

      	<div className="mt-3 p-1 container">
          <CustomSearchForm
              fields={this.state.fields}
              onSubmit={this._onFormSubmit}
              selectedFld={this.state.fld}
              selectedVal={this.state.val}
              selectedStrict={this.state.strict}
             />
          <hr />
  		  </div>

        { this.state.fld && <Results
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
