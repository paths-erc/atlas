import React from 'react';
import { Button } from 'reactstrap';

export default function ClearButton (props) {
  if (!props.show) return null;
  return (
    <Button color="danger" onClick={props.onClick}>
      <span aria-hidden="true">&times;</span>
    </Button>
  );
}
