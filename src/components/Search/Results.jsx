import React, { Component } from 'react';
import { Alert, Button, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Database from '../Services/Database/Database';
import SavedQueries from '../Services/SavedQueries';
import PaginateResult from '../PaginateResult/PaginateResult';
import PaginateResultSummary from '../PaginateResult/PaginateResultSummary';
import { ItemPreview, ItemPreviewWrapper } from './ItemPreview';
import OpenInMap from '../Manuscripts/OpenInMap';
import Loading from '../Loading/Loading';
import CardFields from '../Services/CardFields';
import CardFieldsSelect from './CardFieldsSelect';
import Cfg from '../Services/Cfg/Cfg';
import { withRouter } from '../Utils/withRouter';


class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: false,
      // fields the current result was fetched with (avoids empty cells while reloading)
      shown: null,
      // visibility of the card-fields panel
      showFields: false,
      // field labels from the search config, keyed `table:field`
      labels: null,
      // fields chosen by the user for the cards, null = defaults from Cfg.preview
      columns: CardFields.get(props.tb)
    };
  }

  /**
   * Fields requested to the API. The record id and the card title field are
   * always included: the card needs them for its link and header.
   */
  _requestColumns(columns){
    if (!columns) {
      return undefined;
    }
    return Array.from(new Set(['id', Cfg.id_fld[this.props.tb], ...columns].filter(Boolean)));
  }

  _setColumns(columns){
    CardFields.set(this.props.tb, columns);
    const chosen = CardFields.get(this.props.tb);
    this.setState({ columns: chosen });
    this._fetchData(chosen);
  }

  _fetchData(columns = this.state.columns){
    const cols = this._requestColumns(columns);
    switch (this.props.type) {
      case 'adv':
        Database.getAdv(this.props.tb, this.props.data, this.props.page, d => {
          this.setState({ result: d, shown: columns });
        }, cols);
        break;

      case 'filter':
        Database.getFiltered(this.props.tb, this.props.filter, this.props.page, d => {
          this.setState({ result: d, shown: columns });
        }, cols);
        break;

      case 'all':
        Database.getAll(this.props.tb, this.props.page, d => {
          this.setState({ result: d, shown: columns });
        }, cols);
        break;

      case 'saved':
        Database.getSaved(this.props.tb, this.props.query, this.props.page, d => {
          this.setState({ result: d, shown: columns });
        }, cols);
        break;

      default:
        console.log(`Unknown type ${this.props.type}`);
        return;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.tb !== prevProps.tb) {
      const columns = CardFields.get(this.props.tb);
      this.setState({ columns, labels: null });
      this._fetchLabels();
      this._fetchData(columns);
      return;
    }
    if (
      this.props.page !== prevProps.page
      || this.props.fld !== prevProps.fld
      || this.props.val !== prevProps.val
      || this.props.strict !== prevProps.strict
      || this.props.query !== prevProps.query
      || this.props.data !== prevProps.data
      || JSON.stringify(this.props.filter) !== JSON.stringify(prevProps.filter)
    ) {
      this._fetchData();
    }
  }

  _fetchLabels(){
    const tb = this.props.tb;
    Database.inspect(tb, data => {
      if (this.props.tb === tb) {
        this.setState({ labels: data.fields || {} });
      }
    });
  }

  componentDidMount(){
    this._fetchLabels();
    this._fetchData();
  }

  _buildMapFilter() {
    const { type, tb, query } = this.props;

    if (type === 'saved') {
      return SavedQueries[tb]?.[query]?.filter || null;
    }

    if (type === 'filter') {
      return this.props.filter || null;
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

    const tb = this.props.tb;
    const page = this.props.page || 1;
    const fieldsMap = {};
    (this.state.result.fields || []).forEach(f => { fieldsMap[f.name] = f.label; });
    // the search config labels win: with `columns` the API labels `id` as "id"
    Object.entries(this.state.labels || {}).forEach(([k, v]) => {
      const [fldTb, name] = k.split(':');
      if (fldTb === tb && v.label) { fieldsMap[name] = v.label; }
    });

    return (
      <div>
        <div className="container">
          <div className="clearfix">
            <OpenInMap tb={tb} filter={this._buildMapFilter()} />
            <div className="d-flex align-items-start">
              <PaginateResultSummary
                totalRows={this.state.result.total}
                page={page}
              />
              <Button
                color="secondary"
                outline={!this.state.columns}
                size="sm"
                className="ms-2 mb-3 py-0"
                title="Choose the fields shown in the cards"
                aria-label="Choose the fields shown in the cards"
                aria-expanded={this.state.showFields}
                onClick={() => this.setState({ showFields: !this.state.showFields })}
              >
                <FontAwesomeIcon icon="cog" />
              </Button>
            </div>
            <PaginateResult
              path={this.props.location.pathname}
              search={this.props.location.search}
              totalRows={this.state.result.total}
              page={page}
            />
          </div>

          <Collapse isOpen={this.state.showFields}>
            <CardFieldsSelect
              tb={tb}
              selected={this.state.columns}
              defaults={Cfg.preview[tb]}
              labels={this.state.labels}
              onChange={cols => this._setColumns(cols)}
            />
          </Collapse>

          <ItemPreviewWrapper>
            {
              (this.state.result.data || []).map((e, i) => (
                <ItemPreview
                  key={i}
                  idField={Cfg.id_fld[tb]}
                  previewFlds={this.state.shown || Cfg.preview[tb]}
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
