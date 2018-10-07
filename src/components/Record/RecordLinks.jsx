import React, { Component } from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


class RecordLinks extends Component {

  makeHref(table, query){
    const strippedTb = table.replace('paths__', '');
    let url = [
      '/',
      'search',
      '/',
      strippedTb,
      '/',
      'encoded',
      '?q=' + window.btoa('SELECT * FROM ' + table + ' WHERE ' + query)
    ];

    return url.join('');
  }

  renderLinks(links){

     return Object.entries(links).map(
      ([tb, info], i) => {
        if (info.tot < 1) {
          return null;
        }
        return <ListGroupItem key={i} tag={Link} to={ this.makeHref(tb, info.where) }>
          <FontAwesomeIcon icon="external-link-square-alt" /> {info.tot + ' referenced item' + (info.tot > 1 ? 's': '') + ' in ' + info.tb_label}
        </ListGroupItem>
      }
    )
  }

  renderBackLinks(backlinks){
    if (typeof backlinks === 'undefined' || backlinks.length < 1){
      return false;
    }

    return Object.entries(backlinks).map(
      ([tb, arr], i) => {
        if (arr.tot < 1){
          return false;
        }

        return <ListGroupItem key={i} tag={Link} to={ this.makeHref(tb, arr.where) }>
          <FontAwesomeIcon icon="external-link-square-alt" /> {arr.tot + ' referenced item' + (arr.tot > 1 ? 's': '') + ' in ' + arr.tb_label}
        </ListGroupItem>
      }
    )
  }

  render() {
    if( (!this.props.links && !this.props.backlinks) || (this.props.links.length < 1 && this.props.backlinks.length < 1) ){
      return null;
    }
    return (
      <Card className="mt-2">
        <CardHeader>
          <FontAwesomeIcon icon="link" /> Links
        </CardHeader>
        <CardBody>
          <ListGroup>
            { this.renderLinks(this.props.links) }
            { this.renderBackLinks(this.props.backlinks) }
    	    </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default RecordLinks;
