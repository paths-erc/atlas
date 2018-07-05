import React, { Component } from 'react';

import { Alert } from 'reactstrap';

import queryString from 'qs'

import Database from '../services/database/database';
import SubHead from '../subHead/subHead';
import {PaginateResult, PaginateResultSummary} from '../PaginateResult/PaginateResult';

import { ItemPreview, ItemPreviewWrapper } from './itemPreview';

import Cfg from '../services/Cfg/Cfg';



class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: false
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(tb, type, qstring){

    if (type === 'adv') {
      qstring.adv = queryString.stringify(qstring.adv);
      Database.getAdv(tb, qstring, qstring.page, d => {
        this.setState({ result: d });
      });
    } else if (type === 'simple') {
      Database.getStr(tb, qstring.string, qstring.page, d => {
        this.setState({ result: d });
      });
    } else if (type === 'encoded') {
      Database.getByEncodedSql(tb, qstring.q_encoded, qstring.page, d => {
        this.setState({ result: d });
      });
    } else if (type === 'all') {
      Database.getAll(tb, qstring.page, d => {
        this.setState({ result: d });
      });
    } else {
      this.setState({ result: false });
      return false;
    }
  }

  componentWillReceiveProps(nextProps){
    const qstring = queryString.parse(nextProps.location.search, {ignoreQueryPrefix: true});
    const tb = nextProps.match.params.table;
    const type = nextProps.match.params.type;

    this.changeState(tb, type, qstring);
  }

  componentDidMount(prevProps, prevState){
    const qstring = queryString.parse(this.props.location.search, {ignoreQueryPrefix: true});
    const tb = this.props.match.params.table;
    const type = this.props.match.params.type;

    this.changeState(tb, type, qstring);
  }

  render() {
    if (!this.state.result) {
      return <div className="container">Loading... </div>;
    }

    if(this.state.result.type === 'error') {
      return (
        <div>
          <div className="container">
            <Alert color="danger" className="mt-5">
                <h4 className="alert-heading">We are so sorry!</h4>
                <p>Something went terribly wrong. Please report this error to <a href="https://github.com/paths-erc/atlas/issues">our public repository</a> in order to get it fixes as soon as possible.</p>
            </Alert>
            <div>
              <p>Please file the current URL:</p>

              <Alert color="info" className="border p-3 m-2 ml-4">{ window.location.href }</Alert>
              <p>and the following error message</p>
              <Alert color="info" className="border p-3 m-2 ml-4">
                <pre>
                {this.state.result.text}
                </pre>
              </Alert>
              <p>Full error trace</p>
              <Alert color="info" className="border p-3 m-2 ml-4">
                <pre>
                {this.state.result.trace}
                </pre>
              </Alert>
            </div>
          </div>
        </div>
      )
    }

    if(this.state.result.head.total_rows === 0) {
      return (
        <div>
          <SubHead tb={ this.state.result.head.stripped_table } tblabel={this.state.result.head.table_label } text="Search results" />
            <div className="container">

              <Alert color="warning" className="mt-5">
                  <h4 className="alert-heading">Ooops!</h4>
                  No result found. Please reformulate the query.
              </Alert>
            </div>
        </div>
      )
    }


    return (
    	<div>

        <SubHead tb={ this.state.result.head.stripped_table } tblabel={this.state.result.head.table_label } text="Search results" />

        <div className="container">

          <PaginateResultSummary
            totalRows={this.state.result.head.total_rows}
            page={this.state.result.head.page}
            query={this.state.result.head.query_arrived}
          />

        <PaginateResult
            path={this.props.location.pathname}
            search={ this.props.location.search }
            totalRows={this.state.result.head.total_rows}
            page={this.state.result.head.page}
          />

          <ItemPreviewWrapper>
          { this.state.result.records.map( (e, i) => {
            return <ItemPreview
                idField = { Cfg[this.props.match.params.table].id_field }
                previewFlds = { Cfg[this.props.match.params.table].preview }
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
