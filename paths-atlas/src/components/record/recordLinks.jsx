import React, { Component } from 'react';

import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'


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

  render() {
    const links = this.props.links || [];

    return (
      <Card>
        <CardHeader>
          <FontAwesomeIcon icon="link" /> Links
        </CardHeader>
        <CardBody>
          <ListGroup>
            {
              Object.entries(links).map(
                ([tb, info], i) => {
                  return <ListGroupItem key={i} tag="a" href={ this.makeHref(tb, info.query) }>
                    <FontAwesomeIcon icon="external-link-square-alt" /> {info.tot + ' referenced item' + (info.tot > 1 ? 's': '') + ' in ' + info.tb_label}
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

export default RecordLinks;
