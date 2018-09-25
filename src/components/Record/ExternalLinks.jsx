import React, { Component } from 'react';
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ExternalLinks extends Component {

  render() {

    if ( !this.props.rec || this.props.rec.length < 1 ) {
      return null;
    }
    return <div className="mt-3">

      <Card className="mt-2">
        <CardHeader>
          <FontAwesomeIcon icon={['fab', 'hubspot']} /> External links
        </CardHeader>
        <CardBody>
          <ListGroup>
            { this.props.rec.lcbm && this.props.rec.lcbm.val &&
              <ListGroupItem>
                <a href={"http://coptot.manuscriptroom.com/manuscript-catalog/?gaNum=" + encodeURIComponent(this.props.rec.lcbm.val)} target="_blank">
                  <FontAwesomeIcon icon="external-link-alt" />
                  The Digital Edition of the Coptic Old Testament
                </a>
              </ListGroupItem>
            }

            { this.props.rec.tm && this.props.rec.tm.val  && this.props.tb === 'manuscripts' &&
              <ListGroupItem>
                <a href={"https://www.trismegistos.org/text/" + this.props.rec.tm.val } target="_blank">
                  <FontAwesomeIcon icon="external-link-alt" /> Trismegistos texts
                </a>
              </ListGroupItem>
            }

            { this.props.rec.tm && this.props.rec.tm.val  && this.props.tb === 'places' &&
              <ListGroupItem>
                <a href={"https://www.trismegistos.org/place/" + this.props.rec.tm.val } target="_blank">
                  <FontAwesomeIcon icon="external-link-alt" /> Trismegistos places
                </a>
              </ListGroupItem>
            }

            { this.props.rec.ldab && this.props.rec.ldab.val  && this.props.tb === 'manuscripts' &&
              <ListGroupItem>
                <a href={"https://www.trismegistos.org/ldab/text.php?quick=" + this.props.rec.ldab.val } target="_blank">
                  <FontAwesomeIcon icon="external-link-alt" /> Leuven Database of Ancient books
                </a>
              </ListGroupItem>
            }

            { this.props.rec.pleiades && this.props.rec.pleiades.val  && this.props.tb === 'places' &&
              <ListGroupItem>
                <a href={"https://pleiades.stoa.org/places/" + this.props.rec.pleiades.val } target="_blank">
                  <FontAwesomeIcon icon="external-link-alt" /> Pleiades
                </a>
              </ListGroupItem>
            }

    	    </ListGroup>
        </CardBody>
      </Card>




    </div>
  }
}
