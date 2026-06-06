import React, { Component } from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import qs from 'qs';


class RecordLinks extends Component {

  makeHref(tbId, filter) {
    const tb = tbId;
    if (filter) {
      const entries = Object.entries(filter);
      if (entries.length === 1) {
        const [fld, ops] = entries[0];
        if (ops._eq !== undefined) {
          const rows = { a: { f: fld, o: '_eq', v: String(ops._eq) } };
          return `/search/${tb}?${qs.stringify(rows)}`;
        }
        if (ops._in !== undefined && Array.isArray(ops._in)) {
          const keys = 'abcdefghijklmnopqrstuvwxyz';
          const rows = {};
          ops._in.forEach((val, i) => {
            rows[keys[i] || `r${i}`] = { f: fld, o: '_eq', v: String(val), ...(i > 0 ? { c: 'OR' } : {}) };
          });
          return `/search/${tb}?${qs.stringify(rows)}`;
        }
      }
    }
    return `/search/${tb}/all`;
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
