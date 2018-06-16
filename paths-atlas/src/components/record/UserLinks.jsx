import React, { Component } from 'react';

import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

import Cfg from '../services/Cfg/Cfg';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'


class UserLinks extends Component {

  makeHref(table, id){
    const strippedTb = table.replace('paths__', '');
    let url = [
      '/',
      'read',
      '/',
      strippedTb,
      '/',
      id
    ];

    return url.join('');
  }

  render() {
    const links = this.props.links || [];

    if (typeof links === 'undefined' || links.length < 1) {
      return null;
    }

    return (
      <Card className="mt-2">
        <CardHeader>
          <FontAwesomeIcon icon="link" /> Manualy entered links
        </CardHeader>
        <CardBody>
          <ListGroup>
            {
              links.map(
                (l, i) => {
                  return <ListGroupItem key={i} tag="a" href={ this.makeHref(l.tb, l.ref_id) }>
                    <FontAwesomeIcon icon="external-link-square-alt" />  { Cfg[l.tb.replace('paths__', '')].label } #{ l.ref_id }
                  </ListGroupItem>
                }
              )
            }
    	    </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default UserLinks;
