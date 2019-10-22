import React from 'react';
import { Row, Col } from 'reactstrap';
import QuireMatrixView from './QuireMatrixView';
import PreviewText from './PreviewText';



export default function RecordCell(props) {

  const val = props.val;
  const label = props.label;
  const isCoptic = props.coptic;
  const isGreek = props.greek;
  const fld = props.name;


  if (!val || val === '') {
    return null;
  }

  let className = [];
  if(isCoptic){
    className.push('coptic');
  }
  if(isGreek){
    className.push('greek');
  }

  return (
    <Row className={"border-bottom mt-2 mb-2 pb-1" + (val !== null ? '' : ' d-none') }>
      <Col sm="4" md="3">
        <label className="font-weight-bold">{label}</label>
      </Col>
      <Col>
        <div className={ className.join(' ') }>
          {  ( label === 'Quire layout' ) ? (<QuireMatrixView string={val} />) : <PreviewText text={val} fld={fld} separator={isCoptic ? '\u2027' : '.'} /> }
        </div>
      </Col>
    </Row>
  );
}
