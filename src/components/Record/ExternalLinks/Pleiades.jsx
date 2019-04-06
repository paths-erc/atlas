import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class Pleiades extends Component {

  render() {
    if ( this.props.tb !== 'places' || !this.props.data.val || this.props.data.val.length < 1 ) {
      return null;
    }
    return (
      <div>
        { this.props.data.val.split(',').map( (v, k) => {
          return <ListGroupItem key={k}>
            <a href={"https://pleiades.stoa.org/places/" + v.trim() } target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon="external-link-alt" /> Pleiades {v}
            </a>
          </ListGroupItem>
        }) }
      </div>
    );
  }
}
