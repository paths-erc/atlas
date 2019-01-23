import React, { Component } from 'react';
import Select from 'react-select';

import Database from '../Services/Database/Database';
import Cfg from '../Services/Cfg/Cfg';


export default class FldSelect extends Component {

  constructor(props) {
    super();
    this.state = {
      fields: false,
      fld: false
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
        const v = Cfg.searchDefault[this.props.tb].includes('paths') ? Cfg.searchDefault[this.props.tb] : `paths__${this.props.tb}:${Cfg.searchDefault[this.props.tb]}`;

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
      this._setState(data.fields, this.props.fld);
    });
  }

  render() {
    if (!this.state.fields){
      return null;
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
