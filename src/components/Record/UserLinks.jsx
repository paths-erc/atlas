import React, { Component } from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


class UserLinks extends Component {

  makeHref(table, id){
    const strippedTb = table.replace('paths__', '');
    let url = [
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
          <FontAwesomeIcon icon="link" /> Manually entered links
        </CardHeader>
        <CardBody>
          <ListGroup>
            {
              links.map(
                (l, i) => {
                  return <ListGroupItem key={i} tag={Link} to={ this.makeHref(l.tb_stripped, l.ref_id) }>
                    <FontAwesomeIcon icon="external-link-square-alt" />  { l.tb_label } #{ l.ref_label ? l.ref_label : l.ref_id }
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
