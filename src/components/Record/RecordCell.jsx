import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import QuireMatrixView from './QuireMatrixView';
import PreviewText from './PreviewText';



class RecordCell extends Component {

  render() {
    const val = this.props.val;
    const label = this.props.label;
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

export default RecordCell;
