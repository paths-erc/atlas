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
    /**
     * Object containing data, key (column name): value 
     */
    const el = this.props.record;
    /**
     * Full field name: table_name:fld_name
     */
    const flds = this.props.fields;

    /**
     * Current table name, with no prefix
     */
    const tb = this.props.tb;
    /**
     * Array of preview fields, no table, no prefix
     */
    const preview_flds = this.props.previewFlds;
    /**
     * Id field for tabel, no table, no prefix
     */
    const id_field = this.props.idField;

    return (
      <Col sm="4">
        <Card className="mt-3 shadow-sm">
          <CardHeader tag="h6" style={{ background: '#b33939', color: '#fff' }}>{ el[id_field] }</CardHeader>
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
              <div className="btn-group float-end" role="group">
                <ButtonGroup>
                  <Button size="sm" tag={Link} to={ '/' + [tb, el.id].join('/') } style={{ background: '#b33939', borderColor: '#b33939', color: '#fff' }}>
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
