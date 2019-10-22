import React from 'react';
import { Row, Col } from 'reactstrap';
import QuireMatrixView from './QuireMatrixView';
import PreviewText from './PreviewText';

/**
 * Receives complete data from (api) props
 * @param       {[type]} props [description]
 * @constructor
 */
export default function RecordCellDb(props){

  const val = props.data.val_label ? props.data.val_label : props.data.val;
  const label = props.data.label;
  const fld = props.data.name;
  const isCoptic = props.data.coptic;
  const isGreek = props.data.greek;

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
          {  ( label === 'Quire layout' ) ? (<QuireMatrixView string={val} />) : <PreviewText text={val} fld={ fld } separator={isCoptic ? '\u2027' : '.'} /> }
        </div>
      </Col>
    </Row>
  );
}
