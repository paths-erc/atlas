import React from 'react';
import Cfg from '../Services/Cfg/Cfg';


export default function PaginateResultSummary (props) {

    const curr_page =  props.page ? props.page : 1;
    const rpp = Cfg.rpp;
    const start_at = curr_page * rpp - rpp + 1;
    const up_to = (curr_page * rpp) < props.totalRows ? curr_page * rpp : props.totalRows;

    return (
      <div className="mb-3">
        Showing records <span className="badge" style={{ background: '#b33939' }}>
        { start_at } –  { up_to } </span> of <span className="badge" style={{ background: '#b33939' }}>
        { props.totalRows }</span> records found
      </div>
    );
}