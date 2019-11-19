import React from 'react';
import { InputGroupAddon, Button } from 'reactstrap';

export default function ListPlaces (props) {

    if (!props.show){
      return null;
    }
    return (
      <InputGroupAddon addonType="append">
        <Button color="danger" onClick = { props.onClick }>
          <span aria-hidden="true">&times;</span>
        </Button>
      </InputGroupAddon>
    );
}
