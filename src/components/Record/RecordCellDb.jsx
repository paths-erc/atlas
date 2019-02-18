import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import QuireMatrixView from './QuireMatrixView';
import PreviewText from './PreviewText';




export default class RecordCellDb extends Component {

  render() {
    const val = this.props.data.val_label ? this.props.data.val_label : this.props.data.val;
    const label = this.props.data.label;

    if (!val || val === '') {
      return null;
    }
    let className = [];
    if(this.props.coptic){
      className.push('coptic');
    }
    if(this.props.greek){
      className.push('greek');
    }
    return (
      <Row className={"border-bottom mt-2 mb-2 pb-1" + (val !== null ? '' : ' d-none') }>
        <Col sm="4" md="3">
          <label className="font-weight-bold">{label}</label>
        </Col>
        <Col>
          <div className={ className.join(' ') }>
            {  ( label === 'Quire layout' ) ? (<QuireMatrixView string={val} />) : <PreviewText text={val} separator={this.props.coptic ? '\u2027' : '.'} /> }
          </div>
        </Col>
	    </Row>
    );
  }
}
