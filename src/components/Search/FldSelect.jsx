import React, { Component } from 'react';
import Select from 'react-select';
import { Alert } from 'reactstrap';

import Database from '../Services/Database/Database';
import Cfg from '../Services/Cfg/Cfg';


export default class FldSelect extends Component {

  constructor(props) {
    super();
    this.state = {
      fields: false,
      fld: false,
      error: false
    };
  }

  _setState(fldList, selected){
    fldList = Cfg.fld_whitelist.map(id => {
      if(fldList[id]){
        return { value: id, label: fldList[id].label };
      } else {
        return false;
      }
    }).filter( i => { return i; } );

    let selObj;
    if (selected){
      selObj= fldList.filter( e => {
        return e.value === selected;
      })[0];
    } else {
      if (Cfg.searchDefault[this.props.tb]){
        const def = Cfg.searchDefault[this.props.tb];
        const v = def.includes(':') ? def : `${this.props.tb}:${def}`;

        selObj = fldList.filter( e => {
          return e.value === v;
        })[0];
      } else {
        selObj = fldList[0];
      }
      this.props.onChange(selObj);
    }

    this.setState({
      fields: fldList,
      fld: selObj
    });
  }


  componentDidMount(){
    Database.inspect(this.props.tb, data => {
      if (data.error) {
        this.setState({ fields: [], error: data.error });
        return;
      }
      this._setState(data.fields, this.props.fld);
    });
  }

  render() {
    if (!this.state.fields){
      return null;
    }

    if (this.state.error) {
      return (
        <Alert color="danger" className="mb-0 py-2 small">
          Search fields could not be loaded ({ this.state.error }). Please try again later.
        </Alert>
      );
    }

    return (
        <Select
          defaultValue={ this.state.fld }
          options={ this.state.fields }
          onChange={ this.props.onChange }
          />
    );
  }
}
