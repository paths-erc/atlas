import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import {withRouter} from 'react-router';

import Database from '../Services/Database/Database';
import SavedQueries from '../Services/SavedQueries';
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
      case 'adv':
        Database.getAdv(this.props.tb, this.props.data, this.props.page, d => {
          this.setState({ result: d });
        });
        break;

      case 'all':
        Database.getAll(this.props.tb, this.props.page, d => {
          this.setState({ result: d });
        });
        break;

      case 'saved':
        Database.getSaved(this.props.tb, this.props.query, this.props.page, d => {
          this.setState({ result: d });
        });
        break;

      default:
        console.log(`Unknown type ${this.props.type}`);
        return;
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.page !== prevProps.page
      || this.props.fld !== prevProps.fld
      || this.props.val !== prevProps.val
      || this.props.strict !== prevProps.strict
      || this.props.query !== prevProps.query
      || this.props.data !== prevProps.data
    ) {
      this._fetchData();
    }
  }

  componentDidMount(){
    this._fetchData();
  }

  _buildMapFilter() {
    const { type, tb, query } = this.props;

    if (type === 'saved') {
      return SavedQueries[tb]?.[query]?.filter || null;
    }

    return null;
  }

  render() {
    if (!this.state.result) {
      return <div className="container"><Loading /></div>;
    }

    if (this.state.result.status === 'error') {
      return (
        <div className="container">
          <Alert color="danger" className="mt-5">
            <h4 className="alert-heading">We are so sorry!</h4>
            <p>Something went terribly wrong. Please report this error to <a href="https://github.com/paths-erc/atlas/issues">our public repository</a>.</p>
            <Alert color="info" className="border p-3 mt-2">
              <code>{window.location.href}</code>
            </Alert>
            <Alert color="info" className="border p-3 mt-2">
              <pre>{this.state.result.detail}</pre>
            </Alert>
          </Alert>
        </div>
      );
    }

    if (this.state.result.total === 0) {
      return (
        <div className="container">
          <Alert color="warning" className="mt-5">
            <h4 className="alert-heading">Ooops!</h4>
            No result found. Please reformulate the query.
          </Alert>
        </div>
      );
    }

    const tb = this.props.match.params.table;
    const page = this.props.page || 1;
    const fieldsMap = {};
    (this.state.result.fields || []).forEach(f => { fieldsMap[f.name] = f.label; });

    return (
      <div>
        <div className="container">
          <div className="clearfix">
            <OpenInMap tb={tb} filter={this._buildMapFilter()} />
            <PaginateResultSummary
              totalRows={this.state.result.total}
              page={page}
            />
            <PaginateResult
              path={this.props.location.pathname}
              search={this.props.location.search}
              totalRows={this.state.result.total}
              page={page}
            />
          </div>

          <ItemPreviewWrapper>
            {
              (this.state.result.data || []).map((e, i) => (
                <ItemPreview
                  key={i}
                  idField={Cfg.id_fld[tb]}
                  previewFlds={Cfg.preview[tb]}
                  tb={tb}
                  record={e}
                  fields={fieldsMap}
                />
              ))
            }
          </ItemPreviewWrapper>

          <div className="pt-3">
            <PaginateResult
              path={this.props.location.pathname}
              search={this.props.location.search}
              totalRows={this.state.result.total}
              page={page}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Results);
