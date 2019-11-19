import React from 'react';

import SqlModal from '../SqlModal/SqlModal';




export default function PaginateResultSummary (props) {

    const curr_page =  props.page ? props.page : 1;
    const start_at = curr_page * 30 - 30 + 1;
    const up_to = (curr_page * 30) < props.totalRows ? curr_page * 30 : props.totalRows;

    return (
      <div className="mb-3">
        Showing records <span className="badge badge-primary">
        { start_at } –  { up_to } </span> of <span className="badge badge-success">
        { props.totalRows }</span> records found
        &nbsp;<SqlModal sql={props.query}/>
      </div>
    );
}