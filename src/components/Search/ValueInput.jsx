import React, {useState} from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import Database from '../Services/Database/Database';

export default function ValueInput (props) {

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (string) => {
    setIsLoading(true);
    const [tb, fld] = props.fld.split(':');
    Database.getUniqueVal(tb, fld, string, d => {
      setOptions(d);
      setIsLoading(false)
    });
  };

  return (
    
    <AsyncTypeahead
      id="get-value-from-db"
      isLoading={ isLoading }
      minLength={1}
      options={ options }
 
      multiple={ false }
      placeholder="Add a value"
      onSearch={handleSearch}
      onChange={props.onChange}
      defaultSelected={props.val ? props.val.split(';') : []}
      />
  );
}
