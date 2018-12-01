import React, { Component } from 'react';
import { Row, Col, Table, Card, CardBody, CardHeader, ButtonGroup, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class ItemPreviewWrapper extends Component {

  render() {
    return (
      <Row>{ this.props.children }</Row>
    );
  }
}

class ItemPreview extends Component {

  render() {

    const el = this.props.record;
    const flds = this.props.fields;
    const tb = this.props.tb;

    const preview_flds = this.props.previewFlds;
    const id_field = this.props.idField;

    return (
      <Col sm="4">
      	<Card className="mt-3" outline color="dark">
          <CardHeader tag="h4">{ el[id_field] }</CardHeader>
          <CardBody id={ el.id }>

            <Table hover size="sm">
              <tbody>
                {
                  preview_flds.map( (e, k) => {
                    return <tr key={k}>
                      <th>{ flds[e] }</th>
                      <td>{ el[e] }</td>
                    </tr>
                  } )
                }
              </tbody>
            </Table>

            <div className="clearfix">
              <div className="btn-group float-right" role="group">
                <ButtonGroup>
                  <Button size="sm" color="info" tag={Link} to={ '/' + [tb, el.id].join('/') }>
                    <FontAwesomeIcon icon="eye" /> View
                  </Button>
                </ButtonGroup>
              </div>
            </div>

          </CardBody>
    	  </Card>
      </Col>
    );
  }
}

export {ItemPreview, ItemPreviewWrapper};
