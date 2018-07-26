import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Database from '../Services/Database/Database';
import SubHead from '../SubHead/SubHead';
import SimpleSearchForm from './SimpleSearchForm';
import AdvSearchForm from './AdvSearchForm';


class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tb_label: null,
      fields: null,
      context: 'Simple search'
    };
  }

  componentDidMount(){
    Database.inspect(this.props.match.params.table, data => {
      this.setState({
        fields: data.fields,
        tb_label: data.label
      });
    });
  }

  toggleSearch(){
    this.setState({
      context: this.state.context === 'Simple search' ? 'Advanced search': 'Simple search'
    });
  }

  showSearch(){
    const base = window.location.pathname.replace(/\/search(.*)/, '');
    if(this.state.context === 'Simple search') {
      return <SimpleSearchForm tb={this.props.match.params.table} base={base} />
    } else {
      return <AdvSearchForm tb={this.props.match.params.table} base={base} fields={this.state.fields} />
    }
  }


  render() {
    if (!this.state.fields) {
      return <div className="m-5 p-5">Loading... </div>;
    }

    return (
      <div>
        <SubHead tb={ this.props.match.params.table } tblabel={ this.state.tb_label } text={ this.state.context } />

      	<div className="mt-3 p-1 container">
          { this.showSearch() }
          <hr />
          <Button type="button" color="warning" onClick={ this.toggleSearch.bind(this) }>{ this.state.context }</Button>
  		  </div>
      </div>
    );
  }
}

export default SearchForm;
