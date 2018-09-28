import React, { Component } from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import Database from '../Services/Database/Database';



export default class ValueInput extends Component {

  constructor(props) {
    super();

    this.state = {
      isLoading: false,
      multiple: false,
      options: []
    }
  }

  _handleSearch = (string) => {
    this.setState({isLoading: true});
    const [tb, fld] = this.props.fld.split(':');
    Database.getUniqueVal(tb, fld, string, d => {
      this.setState({
        options : d,
        isLoading: false
      })
    });
  }

  render() {
    if(!this.state.options){
      return null;
    }

    return (
      <div>
        <AsyncTypeahead
          {...this.state}
          minLength={1}
          placeholder="Add a value"
          onSearch={this._handleSearch}
          onInputChange={this.props.onChange}
          onChange={this.props.onChange}
          defaultInputValue={this.props.val ? this.props.val : ''}
          />
      </div>
    );
  }
}
