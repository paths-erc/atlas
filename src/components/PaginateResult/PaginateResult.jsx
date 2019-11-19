import React from 'react';
import qs from 'qs';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';


function build_object(path, queryString, tot_rows, curr_page = 1) {

  const rpp = 30;

  let tot_pages = Math.ceil(tot_rows / rpp);
  let result = [];

  curr_page = parseInt(curr_page, 10);

  let qString = qs.parse(queryString, {ignoreQueryPrefix: true});

  if (curr_page - 2 > 0 ) {
    qString.page = 1;
    result.push({
      to :  path + '?' + qs.stringify(qString),
      text : 1
    });
  }

  if (curr_page - 3 > 0 ) {
    result.push({
      to : '#',
      disabled : true,
      text : '...'
    });
  }


  // -1 page
  if (curr_page - 1 > 0 ) {
    qString.page = (curr_page - 1);
    result.push({
      to : path + '?' + qs.stringify(qString),
      text : qString.page
    });
  }

  // current page
  qString.page = curr_page;
  result.push({
    to : path + '?' + qs.stringify(qString),
    active : true,
    text : curr_page
  });

  // +1 page
  if (curr_page + 1 < tot_pages ) {
    qString.page = (curr_page + 1);
    result.push({
      to : path + '?' + qs.stringify(qString),
      text : qString.page
    });
  }

    // +3 page
  if (curr_page + 2 < tot_pages ) {
    result.push({
      to : '#',
      disabled : true,
      text : '...'
    });
  }

  if (curr_page !== tot_pages ) {
    qString.page = (tot_pages);
    result.push({
      to : path + '?' + qs.stringify(qString),
      text : qString.page
    });
  }

  return result;
}

export default function PaginateResult (props) {


    const result = build_object(
      props.path,
      props.search,
      props.totalRows,
      props.page
    );

    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink>Pages: </PaginationLink>
        </PaginationItem>
        { result.map( (r, i) => {
          const props = {
            disabled: r.disabled,
            active: r.active
          };
         return <PaginationItem {...props} key={i}>
           <PaginationLink tag={Link} to= { r.to }>
              { r.text }
           </PaginationLink>
         </PaginationItem>
        }) }

      </Pagination>
    );
}