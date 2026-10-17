import React, { Component } from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { linkedQuery } from '../Search/LinkedFilter';


class RecordLinks extends Component {

  // Every filter is sent as a ready-made filter (`?filter=`) rather than expanded
  // into form rows: long id lists and relational filters do not fit the form
  makeHref(tbId, filter) {
    if (!filter || Object.keys(filter).length === 0) {
      return `/search/${tbId}/all`;
    }
    const { source } = this.props;
    const from = source ? `${source.tb}:${source.id}` : undefined;
    return `/search/${tbId}?${linkedQuery(filter, from)}`;
  }

  renderLinks(links) {
    if (!links || Object.keys(links).length === 0) {
      return null;
    }
    return Object.entries(links).map(([tb, info], i) => {
      if (!info || info.tot < 1) return null;
      return (
        <ListGroupItem key={i} tag={Link} to={ this.makeHref(tb, info.filter) }>
          <FontAwesomeIcon icon="external-link-square-alt" />{' '}
          {info.tot + ' referenced item' + (info.tot > 1 ? 's' : '') + ' in ' + info.tb_label}
        </ListGroupItem>
      );
    });
  }

  renderBackLinks(backlinks) {
    if (!backlinks || Object.keys(backlinks).length === 0) {
      return null;
    }
    return Object.values(backlinks).map((info, i) => {
      if (!info || info.tot < 1) return null;
      return (
        <ListGroupItem key={i} tag={Link} to={ this.makeHref(info.tb_id, info.filter) }>
          <FontAwesomeIcon icon="external-link-square-alt" />{' '}
          {info.tot + ' referenced item' + (info.tot > 1 ? 's' : '') + ' in ' + info.tb_label}
        </ListGroupItem>
      );
    });
  }

  render() {
    const { links, backlinks } = this.props;
    const hasLinks = links && Object.keys(links).length > 0;
    const hasBacklinks = backlinks && Object.keys(backlinks).length > 0;

    if (!hasLinks && !hasBacklinks) {
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
            { this.renderBackLinks(backlinks) }
          </ListGroup>
        </CardBody>
      </Card>
    );
  }
}

export default RecordLinks;
