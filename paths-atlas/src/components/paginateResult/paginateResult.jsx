import React, { Component } from 'react';
import queryString from 'query-string';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import SqlModal from '../SqlModal/SqlModal';

function build_object(props, path)
{
  let tot_rows,
    curr_page,
    query,
    tot_pages,
    rpp = 30,
    result = [];

  path += '/../encoded';

  if (props.tot_rows && props.curr_page) {
    tot_rows = props.tot_rows;
    curr_page = props.curr_page;

    if (typeof props.query === 'string') {
      query = queryString.parse(this.props.location.search)
    } else {
      query = {};
    }
  } else if (props.total_rows) {
    tot_rows =  props.total_rows;
    curr_page =  props.page && props.page !== 'false' ? props.page : 1;

    query = {
      tb : props.stripped_table,
      q_encoded :  props.query_encoded
    };
  }

  tot_pages = Math.ceil(tot_rows / rpp);
  curr_page = parseInt(curr_page, 10);

  if (curr_page - 2 > 0 ) {
    query.page = 1;
    result.push({
      href :  path + '?' + queryString.stringify(query),
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
    query.page = (curr_page - 1);
    result.push({
      href : path + '?' + queryString.stringify(query),
      text : query.page
    });
  }

  // current page
  query.page = curr_page;
  result.push({
    href : path + '?' + queryString.stringify(query),
    active : true,
    text : curr_page
  });

  // +1 page
  if (curr_page + 1 < tot_pages ) {
    query.page = (curr_page + 1);
    result.push({
      href : path + '?' + queryString.stringify(query),
      text : query.page
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
    query.page = (tot_pages);
    result.push({
      href : path + '?' + queryString.stringify(query),
      text : query.page
    });
  }

  return result;
}

class PaginateResult extends Component {

  render() {
    const result = build_object(this.props.head, this.props.path);

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

    const curr_page =  this.props.head.page && this.props.head.page !== 'false' ? this.props.head.page : 1;
    const start_at = curr_page * 30 - 30 + 1;
    const up_to = (curr_page * 30) < this.props.head.total_rows ? curr_page * 30 : this.props.head.total_rows;

    return (
      <div className="mb-3">
        Showing records <span className="badge badge-primary">
        { start_at } –  { up_to } </span> of <span className="badge badge-success">
        { this.props.head.total_rows }</span> records found
        &nbsp;<SqlModal sql={this.props.head.query_arrived}/>
      </div>
    );

  }
}

export {PaginateResult, PaginateResultSummary};
