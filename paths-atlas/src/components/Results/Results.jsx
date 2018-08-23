import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import qs from 'qs'

import Database from '../Services/Database/Database';
import SubHead from '../SubHead/SubHead';
import {PaginateResult, PaginateResultSummary} from '../PaginateResult/PaginateResult';
import { ItemPreview, ItemPreviewWrapper } from './ItemPreview';
import MsPlaces from '../Manuscripts/MsPlaces';

import Cfg from '../Services/Cfg/Cfg';



class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: false,
      title: false
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(tb, type, qstring){

    if (type === 'adv') {
      qstring.adv = qs.stringify(qstring.adv);
      Database.getAdv(tb, qstring, qstring.page, d => {
        this.setState({ result: d });
        this.setState({ title: "Advanced search in " + d.head.table_label });
      });
    } else if (type === 'simple') {

      if(!qstring.string || qstring.string === ''){
        this.setState({
          result: {
            type: 'error',
            text: 'Please enter a string to serach'
          }
        });
      } else{
        Database.getStr(tb, qstring.string, qstring.page, (d, t) => {
          this.setState({ result: d });
          this.setState({ title: t });
        });
      }
    } else if (type === 'encoded') {
      Database.getByEncodedSql(tb, qstring.q_encoded, qstring.page, d => {
        this.setState({ result: d });
      });
    } else if (type === 'all') {
      Database.getAll(tb, qstring.page, d => {
        this.setState({ result: d});
        this.setState({ title: "Show all " + d.head.table_label });
      });
    } else if (type === 'saved') {
      Database.getSaved(tb, qstring.q, qstring.page, (d, t) => {
        this.setState({ result: d });
        this.setState({ title: t });
      });
    } else {
      this.setState({ result: false });
      return false;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps !== this.props ){
      this.setState({
        result: null
      });
      const qstring = qs.parse(nextProps.location.search, {ignoreQueryPrefix: true});
      const tb = nextProps.match.params.table;
      const type = nextProps.match.params.type;
      this.changeState(tb, type, qstring);
    }
  }

  componentDidMount(prevProps, prevState){
    const qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
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
          <SubHead  tb={ this.state.result.head.stripped_table }
                    tblabel={this.state.result.head.table_label }
                    text={ this.state.title ? this.state.title : "Query results"} />
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

        <SubHead  tb={ this.state.result.head.stripped_table }
                  tblabel={this.state.result.head.table_label }
                  text={ this.state.title ? this.state.title : "Query results"} />

        <div className="container">

          <div className="clearfix">

            <MsPlaces
              tb={this.state.result.head.stripped_table}
              where={this.state.result.head.query_where}
              type={this.props.match.params.type}
              search={ qs.parse(this.props.location.search, {ignoreQueryPrefix: true}) }
              />

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
        </div>



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

export default Results;
