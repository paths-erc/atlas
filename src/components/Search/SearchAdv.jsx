import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import qs from 'qs';

import SubHead from '../SubHead/SubHead';
import Results from './Results';
import FldSelect from './FldSelect';
import ValueInput from './ValueInput';
import OperatorSelect from './OperatorSelect';
import ConnectorSelect from './ConnectorSelect';


export default class AdvSearchForm extends Component {

  constructor(props) {
    super(props);

    const qstring = qs.parse(props.location.search, {ignoreQueryPrefix: true});

    let rows;
    let show = false;

    if(Object.getOwnPropertyNames(qstring).length === 0){
      rows = {
        'a': {
          f: '',
          o: 'LIKE',
          v: ''
        }
      };
    } else {
      rows = qstring;
      show = true;
    }

    this.state = {
      rows: rows,
      showResults: show,
      page: false
    };

    this._changeOperator = this._changeOperator.bind(this);
    this._changeConnector = this._changeConnector.bind(this);
    this._addRow = this._addRow.bind(this);
    this._removeRow = this._removeRow.bind(this);

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
    rows[uid] = { f: '', o: 'LIKE', v: '', c: 'AND'}
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
    this.props.history.push(`/search/${this.props.match.params.table}/adv?${s}`);
  }

  componentDidUpdate(prevProps, prevState){
    const qstring = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    if(this.state.page !== qstring.page){
      this.setState({
        page: qstring.page
      });
    }
  }

  render() {
    return (
      <div>
        <SubHead tb={ this.props.match.params.table } text='Advanced search' />

        <div className="mt-3 p-1 container">
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
