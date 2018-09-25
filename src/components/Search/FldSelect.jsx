import React, { Component } from 'react';
import Select from 'react-select';

import Database from '../Services/Database/Database';


export default class FldSelect extends Component {

  constructor(props) {
    super();
    this.state = {
      fields: false,
      fld: false
    };
  }

  _setState(fldList, selected, parse){
    if (parse){
      fldList = Object.keys(fldList).map(key => {
        return { value: fldList[key].fullname, label: fldList[key].label };
      });
    }
    let selObj;
    if (selected){
      selObj= fldList.filter( e => {
        return e.value === selected;
      })[0];
    } else {
      selObj = fldList[0];
      this.props.onChange(selObj);
    }

    this.setState({
      fields: fldList,
      fld: selObj
    });
  }


  componentDidMount(){
    if (!this.props.fields){
      Database.inspect(this.props.tb, data => {
        this._setState(data.fields, this.props.fld, true);
      });
    } else {
      this._setState(this.props.fields, this.props.fld);
    }

  }

  render() {
    if (!this.state.fields){
      return null;
    }

    return (
        <Select
          name="fld"
          defaultValue={ this.state.fld }
          options={ this.state.fields }
          onChange={ this.props.onChange }
          />
    );
  }
}
