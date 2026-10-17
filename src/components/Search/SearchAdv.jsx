import React, { Component } from 'react';
import { Row, Col, Button, Alert, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import qs from 'qs';

import SubHead from '../SubHead/SubHead';
import Results from './Results';
import FldSelect from './FldSelect';
import ValueInput from './ValueInput';
import OperatorSelect from './OperatorSelect';
import ConnectorSelect from './ConnectorSelect';
import Cfg from '../Services/Cfg/Cfg';
import { parseLinked } from './LinkedFilter';
import { withRouter } from '../Utils/withRouter';

// more conditions than this make the form too long to scroll: collapse it
const MAX_OPEN_ROWS = 5;

const defaultRows = () => ({ 'a': { f: '', o: '_icontains', v: '' } });


class AdvSearchForm extends Component {

  constructor(props) {
    super(props);

    const qstring = qs.parse(props.location.search, {ignoreQueryPrefix: true});

    let rows;
    let show = false;

    // linked searches (record links) are not edited through the form
    if(Object.getOwnPropertyNames(qstring).length === 0 || parseLinked(props.location.search)){
      rows = defaultRows();
    } else {
      rows = qstring;
      show = true;
    }

    this.state = {
      rows: rows,
      showResults: show,
      page: false,
      formOpen: !this._shouldCollapse(rows, props.match.params.table)
    };

    this._changeOperator = this._changeOperator.bind(this);
    this._changeConnector = this._changeConnector.bind(this);
    this._addRow = this._addRow.bind(this);
    this._removeRow = this._removeRow.bind(this);

  }


  /**
   * A form is collapsed when it has too many rows, or a row on a field that
   * the field selector cannot show (not whitelisted, e.g. `id`)
   */
  _shouldCollapse(rows, tb){
    const list = Object.values(rows);
    if (list.length > MAX_OPEN_ROWS) { return true; }
    return list.some(r => r && r.f && !Cfg.fld_whitelist.includes(r.f.includes(':') ? r.f : `${tb}:${r.f}`));
  }

  _removeRow(e){
    let rows = this.state.rows;
    const delKey = e.target.name;
    delete rows[delKey];
    this.setState({
      rows: rows,
      showResults: false
    });
  }

  _addRow(){
    let rows = this.state.rows;
    const uid = 'a' + Math.random().toString(36).substr(2, 9);
    rows[uid] = { f: '', o: '_icontains', v: '', c: 'AND'}
    this.setState({
      rows: rows,
      showResults: false
    });
  }

  _changeField(index, val){
    let rows = this.state.rows;
    rows[index].f = val.constructor === Object && val.value ? val.value : val;
    this.setState({
      rows: rows,
      showResults: false
    });
  }

  _changeVal(index, val){
    let rows = this.state.rows;
    rows[index].v = val.constructor === Array ? val[0] : val;
    this.setState({
      rows: rows,
      showResults: false
    });
  }

  _changeOperator(e){
    let rows = this.state.rows;
    rows[e.target.name].o = e.target.value;
    this.setState({
      rows: rows,
      showResults: false
    });
  }

  _changeConnector(e){
    let rows = this.state.rows;
    rows[e.target.name].c = e.target.value;
    this.setState({
      rows: rows,
      showResults: false
    });
  }

  _handleSubmit(e){
    e.preventDefault();
    this.setState({
      showResults: true
    });
    const s = qs.stringify(this.state.rows)
    this.props.history.push(`/search/${this.props.match.params.table}?${s}`);
  }

  componentDidUpdate(prevProps, prevState){
    const qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    if(this.state.page !== qstring.page){
      this.setState({
        page: qstring.page
      });
    }

    // back from a linked search to a blank form ("New search")
    if(parseLinked(prevProps.location.search) && !this.props.location.search){
      this.setState({ rows: defaultRows(), showResults: false, formOpen: true });
    }
  }

  _renderLinked(linked){
    const tb = this.props.match.params.table;
    const [fromTb, fromId] = (linked.from || '').split(':');

    return (
      <div>
        <SubHead tb={ tb } text='Linked records' />
        <div className="container mt-3">
          <Alert color="info" className="d-flex justify-content-between align-items-center">
            <span>
              { fromTb && fromId
                ? <>Records linked to <Link to={`/${fromTb}/${fromId}`}>paths.{fromTb}.{fromId}</Link></>
                : 'Records selected from a link' }
            </span>
            <Button tag={Link} to={`/search/${tb}`} color="info" outline size="sm">New search</Button>
          </Alert>
        </div>
        <Results
          tb={tb}
          type="filter"
          filter={linked.filter}
          page={qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).page}
        />
      </div>
    );
  }

  render() {
    const linked = parseLinked(this.props.location.search);
    if (linked) {
      return this._renderLinked(linked);
    }

    const nRows = Object.keys(this.state.rows).length;
    const collapsible = this.state.showResults && this._shouldCollapse(this.state.rows, this.props.match.params.table);

    return (
      <div>
        <SubHead tb={ this.props.match.params.table } text='Search' />

        <div className="mt-3 p-1 container">
          { collapsible && <Alert color="info" className="d-flex justify-content-between align-items-center">
            <span>Search with { nRows } conditions</span>
            <Button color="info" outline size="sm" onClick={ () => this.setState({ formOpen: !this.state.formOpen }) }>
              { this.state.formOpen ? 'Hide' : 'Show' } conditions
            </Button>
          </Alert> }
          <Collapse isOpen={ !collapsible || this.state.formOpen }>
          <form onSubmit={this._handleSubmit.bind(this)} className="form">
            {
              Object.entries(this.state.rows).map((e, i)=>{
                const k = e[0];
                const v = e[1];

                return <div key={i} className="my-3">
                  <Row>
                    <Col xs={1}>
                      { i > 0 && <ConnectorSelect
                          defaultValue={v.c}
                          onChange={this._changeConnector}
                          name={k}
                        />}
                    </Col>
                    <Col xs={4}>
                      <FldSelect
                        tb={ this.props.match.params.table }
                        fld={v.f}
                        onChange={ this._changeField.bind(this, k) }
                        />
                    </Col>
                    <Col xs={2}>
                      <OperatorSelect
                        defaultValue={v.o}
                        name={k}
                        onChange={ this._changeOperator }
                        />
                    </Col>
                    <Col xs={3}>
                      <ValueInput
                        fld={ v.f }
                        val={v.v}
                        onChange={this._changeVal.bind(this, k)}
                        />
                    </Col>

                    <Col xs={1}>
                      { i+1 === Object.keys(this.state.rows).length && <Button type="button" color="info" block onClick={ this._addRow }>+</Button>}
                    </Col>
                    <Col xs={1}>
                      { i > 0 && <Button type="button" color="danger" block name={k} onClick={ this._removeRow }>-</Button>}
                    </Col>
                  </Row>
                </div>
              })
            }

            <Button type="submit" color="success" block>Search!</Button>
          </form>
          </Collapse>
          <hr />
        </div>

        { this.state.showResults && <Results
            tb={this.props.match.params.table}
            type="adv"
            data={this.state.rows}
            page={this.state.page}
            />}
      </div>
    );
  }
}

export default withRouter(AdvSearchForm);
