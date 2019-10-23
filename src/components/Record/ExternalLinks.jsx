import React, { Component } from 'react';
import { Card, CardHeader, CardBody, ListGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CoptOT from './ExternalLinks/CoptOT';
import TM from './ExternalLinks/TM';
import TmGeo from './ExternalLinks/TmGeo';
import Ldab from './ExternalLinks/Ldab';
import Pleiades from './ExternalLinks/Pleiades';
import CopticColophons from './ExternalLinks/CopticColophons';
import Dbmnt from './ExternalLinks/Dbmnt';


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
            <CoptOT   data={this.props.rec.lcbm}  tb={this.props.tb}/>
            <TM       data={this.props.rec.tm}    tb={this.props.tb} />
            <Ldab     data={this.props.rec.ldab}  tb={this.props.tb} />
            <Dbmnt    data={this.props.rec.dbmnt} tb={this.props.tb} />

            <TmGeo data={this.props.rec.tmgeo}    tb={this.props.tb} />
            <Pleiades data={this.props.rec.pleiades} tb={this.props.tb} />
            <CopticColophons data={this.props.rec.id} tb={this.props.tb} />

    	    </ListGroup>
        </CardBody>
      </Card>

    </div>
  }
}
