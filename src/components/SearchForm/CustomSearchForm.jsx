import React, { Component } from 'react';
import { FormGroup, Input, Button, Col, Label } from 'reactstrap';

import SimpleSearchForm from './SimpleSearchForm';

const searcheable = {
  'manuscripts': [
    { 'id': 'paths__manuscripts:id',      'label': 'CLM' },
    { 'id': 'paths__manuscripts:cmclid',  'label': 'CMCL' },
    { 'id': 'paths__manuscripts:tm',      'label': 'TM' },
    { 'id': 'paths__manuscripts:ldab',    'label': 'LDAB' },
    { 'id': 'paths__m_shelfmarks:collection',    'label': 'Collection' },
    { 'id': 'paths__m_shelfmarks:shelfmark',    'label': 'Shelfmark' }
  ]
};


export default class CustomSearchForm extends Component {

  render() {

    if (typeof searcheable[this.props.tb] === 'undefined'){
      return <SimpleSearchForm base={this.props.base} tb={this.props.tb} />;
    }

    return (
      <div>
        <form action={`${this.props.base}/results/${this.props.tb}/adv`} method="get" id="searchTitles" className="form">

          { searcheable[this.props.tb].map((fld, i) => {
            return (
              <FormGroup row key={i}>
                <Label sm={4} className="text-right">{ fld.label }</Label>
                <Col sm={6}>
                  <Input type="hidden" name={ 'adv[aa' + i + '][fld]' } value={ fld.id } />
                  <Input type="hidden" name={ 'adv[aa' + i + '][operator]' } value="LIKE" />
                  <Input type="input" name={ 'adv[aa' + i + '][value]' } autoComplete="off" />
                  { i > 0  && <Input type="hidden" name={ 'adv[aa' + i + '][connector]' } value="AND" /> }
                </Col>
                <Col sm={2}>
                  <Input type="checkbox" name="loose" /> Strict
                </Col>
              </FormGroup>
            );
          }) }

          <Button type="submit" color="success" block>Search!</Button>

        </form>
      </div>
    );
  }
}
