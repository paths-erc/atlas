import React, { Component } from 'react';
import qs from 'qs';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import SqlModal from '../SqlModal/SqlModal';


function build_object(path, queryString, tot_rows, curr_page = 1)
{

  const rpp = 30;

  let tot_pages = Math.ceil(tot_rows / rpp);
  let result = [];

  curr_page = parseInt(curr_page, 10);

  let qString = qs.parse(queryString, {ignoreQueryPrefix: true});

  if (curr_page - 2 > 0 ) {
    qString.page = 1;
    result.push({
      href :  path + '?' + qs.stringify(qString),
      text : 1
    });
  }

  if (curr_page - 3 > 0 ) {
    result.push({
      href : '#',
      disabled : true,
      text : '...'
    });
  }


  // -1 page
  if (curr_page - 1 > 0 ) {
    qString.page = (curr_page - 1);
    result.push({
      href : path + '?' + qs.stringify(qString),
      text : qString.page
    });
  }

  // current page
  qString.page = curr_page;
  result.push({
    href : path + '?' + qs.stringify(qString),
    active : true,
    text : curr_page
  });

  // +1 page
  if (curr_page + 1 < tot_pages ) {
    qString.page = (curr_page + 1);
    result.push({
      href : path + '?' + qs.stringify(qString),
      text : qString.page
    });
  }

    // +3 page
  if (curr_page + 2 < tot_pages ) {
    result.push({
      href : '#',
      disabled : true,
      text : '...'
    });
  }

  if (curr_page !== tot_pages ) {
    qString.page = (tot_pages);
    result.push({
      href : path + '?' + qs.stringify(qString),
      text : qString.page
    });
  }

  return result;
}

class PaginateResult extends Component {

  render() {

    const result = build_object(
      this.props.path,
      this.props.search,
      this.props.totalRows,
      this.props.page
    );

    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink previous href="#">Pages: </PaginationLink>
        </PaginationItem>
        { result.map( (r, i) => {
          const props = {
            disabled: r.disabled,
            active: r.active
          };
         return <PaginationItem {...props} key={i}>
           <PaginationLink href= { r.href }>
              { r.text }
           </PaginationLink>
         </PaginationItem>
        }) }

      </Pagination>
    );

  }
}
class PaginateResultSummary extends Component {

  render() {

    const curr_page =  this.props.page ? this.props.page : 1;
    const start_at = curr_page * 30 - 30 + 1;
    const up_to = (curr_page * 30) < this.props.totalRows ? curr_page * 30 : this.props.totalRows;

    return (
      <div className="mb-3">
        Showing records <span className="badge badge-primary">
        { start_at } –  { up_to } </span> of <span className="badge badge-success">
        { this.props.totalRows }</span> records found
        &nbsp;<SqlModal sql={this.props.query}/>
      </div>
    );

  }
}

export {PaginateResult, PaginateResultSummary};
