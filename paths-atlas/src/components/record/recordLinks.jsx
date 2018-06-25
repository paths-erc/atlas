import React, { Component } from 'react';

import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

import Cfg from '../services/Cfg/Cfg';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';


class RecordLinks extends Component {

  makeHref(table, query){
    const strippedTb = table.replace('paths__', '');
    let url = [
      '/',
      'results',
      '/',
      strippedTb,
      '/',
      'encoded',
      '?q_encoded=' + window.btoa('SELECT * FROM ' + table + ' WHERE ' + query),
      '&tb=' + strippedTb
    ];

    return url.join('');
  }

  renderLinks(links){
    if (typeof links === 'undefined' || links.length < 1){
      return false;
    }
     return Object.entries(links).map(
      ([tb, info], i) => {
        return <ListGroupItem key={i} tag="a" href={ this.makeHref(tb, info.query) }>
          <FontAwesomeIcon icon="external-link-square-alt" /> {info.tot + ' referenced item' + (info.tot > 1 ? 's': '') + ' in ' + info.tb_label}
        </ListGroupItem>
      }
    )
  }

  renderBackLinks(backLinks){
    if (typeof backLinks === 'undefined' || backLinks.length < 1){
      return false;
    }

    return Object.entries(backLinks).map(
      ([tb, arr], i) => {
        if (arr.length < 1){
          return false;
        }

        let id_arr = [];
        arr.forEach( e => {
          id_arr.push(e.id);
        });
        let info = {
          tot: arr.length,
          tb_label: Cfg[tb.replace('paths__', '')].label,
          query: '`id` IN (' + id_arr.join(', ') + ')'
        };

        return <ListGroupItem key={i} tag="a" href={ this.makeHref(tb, info.query) }>
          <FontAwesomeIcon icon="external-link-square-alt" /> {info.tot + ' referenced item' + (info.tot > 1 ? 's': '') + ' in ' + info.tb_label}
        </ListGroupItem>
      }
    )
  }

  render() {
    const links = this.props.links || [];
    const backLinks = this.props.backLinks || [];

    if ( links.length < 1 && backLinks.length < 1 ) {
      return null;
    }

    return (
      <Card className="mt-2">
        <CardHeader>
          <FontAwesomeIcon icon="link" /> Links
        </CardHeader>
        <CardBody>
          <ListGroup>
            { this.renderLinks(links) }
            { this.renderBackLinks(backLinks) }
    	    </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default RecordLinks;
