import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import qs from 'qs';
import {withRouter} from 'react-router';

import Database from '../Services/Database/Database';
import PaginateResult from '../PaginateResult/PaginateResult';
import PaginateResultSummary from '../PaginateResult/PaginateResultSummary';
import { ItemPreview, ItemPreviewWrapper } from './ItemPreview';
import OpenInMap from '../Manuscripts/OpenInMap';
import Loading from '../Loading/Loading';
import Cfg from '../Services/Cfg/Cfg';



class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: false
    };
  }

  _fetchData(){
    switch (this.props.type) {
      case 'simple':
        Database.getSimple(this.props.tb, this.props.fld, this.props.val, this.props.strict, this.props.page, d => {
          this.setState({
            result: d
          });
        });
        break;

        case 'adv':
          Database.getAdv(this.props.tb, this.props.data, this.props.page, d => {
            this.setState({
              result: d
            });
          });
          break;

        case 'all':
          Database.getAll(this.props.tb, this.props.page, d => {
            this.setState({
              result: d
            });
          });
          break;

        case 'saved':
          Database.getSaved(this.props.tb, this.props.query, this.props.page, d => {
            this.setState({
              result: d
            });
          });
          break;

        case 'encoded':
          Database.getByEncodedSql(this.props.tb, this.props.q, this.props.page, d => {
            this.setState({
              result: d
            });
          });
          break;

        default:
          console.log(`Unknown verb ${this.props.type}`);
          return null;
    }

  }


  componentDidUpdate(prevProps) {
    if (
      this.props.page !== prevProps.page
      || this.props.fld !== prevProps.fld
      || this.props.val !== prevProps.val
      || this.props.strict !== prevProps.strict
      || this.props.query !== prevProps.query
    ) {
      this._fetchData();
    }
  }

  componentDidMount(){
    this._fetchData();
  }

  render() {
    if (!this.state.result) {
      return <div className="container"><Loading /></div>;
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
              <Alert color="info" className="border p-3 m-2 ml-4">{ decodeURIComponent(window.location.href) }</Alert>
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

        <div className="container">

          <div className="clearfix">

            <OpenInMap
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
          {
             this.state.result.records.map( (e, i) => {
              return <ItemPreview
                  idField = { Cfg.id_fld[this.props.match.params.table] }
                  previewFlds = { Cfg.preview[this.props.match.params.table] }
                  tb={this.props.match.params.table}
                  record={e}
                  fields={this.state.result.head.fields}
                  key={i} />
            })
          }
          </ItemPreviewWrapper>

          <div className="pt-3">
            <PaginateResult
                path={this.props.location.pathname}
                search={ this.props.location.search }
                totalRows={this.state.result.head.total_rows}
                page={this.state.result.head.page}
              />
          </div>

        </div>

		  </div>
    );
  }
}
export default withRouter(Results);
