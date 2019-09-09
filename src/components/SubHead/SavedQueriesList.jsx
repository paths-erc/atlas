import React, { Component } from 'react';
import { Card, CardTitle, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

import SavedQueries from '../Services/SavedQueries';

export default class SavedQueriesList extends Component {

  render(){
    const tblabel = this.props.tblabel;
    const tb = this.props.tb;

    return (
      <div>
        <Card className="mt-5 mb-5" color="light">
          <div className="text-right">
            <button type="button" className="close mr-2 mt-2" aria-label="Close" onClick={this.props.closeFn}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        <CardBody>
          <CardTitle>Saved queries for {tblabel}</CardTitle>
            <ListGroup>
              { Object.values(SavedQueries[tb]).map( (e, i) => {
                return <ListGroupItem key={i}  onClick={this.props.closeFn} className="mb-3" tag={Link} to={ `/search/${tb}/saved?q=${e.id}`} color="secondary">
                    <FontAwesomeIcon icon="arrow-circle-right" /> { e.title }
                </ListGroupItem>
              }) }
            </ListGroup>
        </CardBody>
      </Card>
      </div>
    );
  }
}
