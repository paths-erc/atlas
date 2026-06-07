import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'reactstrap';
import SubHead from '../SubHead/SubHead';

export default function SearchShortSQL() {
  const { table } = useParams();
  return (
    <div>
      <SubHead tb={table} text='Custom query' />
      <div className="container mt-4">
        <Alert color="warning">
          ShortSQL custom queries are not supported in this version. Use Simple or Advanced search.
        </Alert>
      </div>
    </div>
  );
}
