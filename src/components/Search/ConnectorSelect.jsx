import React from 'react';
import {Input} from 'reactstrap';


export default function ConnectorSelect (props) {

  return (
    <div>
      <Input type="select" {...props}>
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </Input>
    </div>
  );
}
