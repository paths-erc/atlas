import React, { Component } from 'react';

import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import SubHead from '../subHead/subHead';

import RecordCell from '../record/recordCell';
import RecordLinks from '../record/recordLinks';



class ReadTitle extends Component {

  render() {

    const record = this.props.record;
    const core = record.core;

    const coptic = ['text'];
    const fields = ['workcc', 'msid', 'type', 'description', 'modulartypology', 'writingaxis', 'thickandthin', 'text', 'translation', 'taggedtext'];

    return (
      <div>

        <SubHead tblabel="Titles" tb="titles" text="View record" />

        <div className="container">
          <Row className="mt-2">
            <Col sm="8">
              <Card>
                <CardHeader>
                  <h3>paths.{ record.metadata.stripped_table }.{ core.id }</h3>
                </CardHeader>
                <CardBody>
                  {
                    fields.map( (i, k) => {
                      return <RecordCell label={ record.fields[i]} val={ core[i] } coptic={ coptic.indexOf(i) > -1 } key={k} />
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
