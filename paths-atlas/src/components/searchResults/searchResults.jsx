import React, { Component } from 'react';

import queryString from 'query-string'

import Database from '../services/database/database';
import SubHead from '../subHead/subHead';
import {PaginateResult, PaginateResultSummary} from '../paginateResult/paginateResult';

import { ItemPreview, ItemPreviewWrapper } from './itemPreview';

class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: false
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(tb, type, qs){

    if (type === 'adv') {
      Database.getAdv(tb, qs, false, d => {
        this.setState({ result: d });
      });
    } else if (type === 'encoded') {
      Database.getByEncodedSql(tb, qs.q_encoded, qs.page, d => {
        this.setState({ result: d });
      });
    } else if (type === 'all') {
      Database.getAll(tb, qs.page, d => {
        this.setState({ result: d });
      });
    } else {
      this.setState({ result: false });
      return false;
    }
  }

  componentWillReceiveProps(nextProps){
    const qs = queryString.parse(nextProps.location.search);
    const tb = nextProps.match.params.table;
    const type = nextProps.match.params.type;

    this.changeState(tb, type, qs);
  }

  componentDidMount(prevProps, prevState){

    const qs = queryString.parse(this.props.location.search);
    const tb = this.props.match.params.table;
    const type = this.props.match.params.type;

    this.changeState(tb, type, qs);
  }

  render() {
    if (!this.state.result) {
      return <div className="container">Loading... </div>;
    }

    return (
    	<div>

        <SubHead tb={ this.state.result.head.stripped_table } tblabel={this.state.result.head.table_label } text="Search results" />

        <div className="container">

          <PaginateResultSummary head={this.state.result.head} />

          <PaginateResult head={this.state.result.head} path={this.props.location.pathname} />

          <ItemPreviewWrapper>
          { this.state.result.records.map( (e, i) => {
            return <ItemPreview
                tb={this.props.match.params.table}
                record={e}
                fields={this.state.result.head.fields}
                key={i} />
          }) }
          </ItemPreviewWrapper>

        </div>

		  </div>
    );
  }
}

export default SearchResults;
