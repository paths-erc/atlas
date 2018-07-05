import React, { Component } from 'react';

import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import SubHead from '../SubHead/SubHead';

import RecordCell from '../Record/RecordCell';
import RecordLinks from '../Record/RecordLinks';



class ReadTitle extends Component {

  render() {

    const record = this.props.record;
    const core = record.core;

    const coptic = ['text'];

    return (
      <div>

        <SubHead tblabel="Titles" tb="titles" text="View record" />

        <div className="container">
          <Row className="mt-2">
            <Col sm="8">
              <Card>
                <CardHeader>
                  <h3>paths.{ record.metadata.tb_stripped }.{ core.id.val }</h3>
                </CardHeader>
                <CardBody>
                  {
                    Object.values(record.core).map( (i, k) => {
                      return <RecordCell label={ i.label } val={ i.val_label ? i.val_label : i.val} key={k} coptic={ coptic.indexOf(i.name) > -1 } />
                    })
                  }
                </CardBody>
        	    </Card>
            </Col>
            <Col xs="4">
              <RecordLinks links={ record.coreLinks } />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ReadTitle;
