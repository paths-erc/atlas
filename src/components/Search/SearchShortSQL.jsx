import React from 'react';
import { Alert } from 'reactstrap';
import SubHead from '../SubHead/SubHead';

export default function SearchShortSQL(props) {
  return (
    <div>
      <SubHead tb={props.match.params.table} text='Custom query' />
      <div className="container mt-4">
        <Alert color="warning">
          ShortSQL custom queries are not supported in this version. Use Simple or Advanced search.
        </Alert>
      </div>
    </div>
  );
}
