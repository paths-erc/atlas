import React, {useState, useCallback, useRef} from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import Database from '../Services/Database/Database';

export default function ValueInput (props) {

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  // ignore responses of superseded requests (typing faster than the API answers)
  const lastRequest = useRef(0);
  const typeahead = useRef(null);

  // An <input> flattens the line breaks of a multi-line value (e.g. gennotes), so
  // right after a pick the typeahead sees "edited" text, echoes the flattened text
  // through onInputChange and then clears the selection with onChange([]),
  // wiping the value. Ignore those echoes while the text still equals the pick.
  const picked = useRef(null);
  // (the <input> drops the line breaks outright, without leaving a space)
  const norm = s => String(s).replace(/\s+/g, '');
  const isEcho = text => picked.current !== null && norm(text) === norm(picked.current);

  const handleSearch = useCallback((string) => {
    // the text of a just-picked option comes back as a search: no need to query
    if (isEcho(string)) return;
    setIsLoading(true);
    const [tb, fld] = props.fld.split(':');
    const request = ++lastRequest.current;
    Database.getUniqueVal(tb, fld, string, d => {
      if (request !== lastRequest.current) return;
      // the API returns raw column values: integer fields (e.g. manuscripts:id)
      // come back as numbers, but the typeahead needs string labels to filter on
      setOptions(d.filter(v => v !== null && v !== '').map(String));
      setIsLoading(false)
    });
  }, [props.fld]);

  const handleChange = useCallback((selected) => {
    if (selected.length) {
      picked.current = selected[0];
      props.onChange(selected);
      // leave the field: while it keeps the focus the typeahead can re-open its
      // menu over the Search button and swallow the click
      if (typeahead.current) typeahead.current.blur();
      return;
    }
    const input = typeahead.current && typeahead.current.getInput();
    if (input && isEcho(input.value)) return;
    picked.current = null;
    props.onChange(selected);
  }, [props.onChange]);

  const handleInputChange = useCallback((text, e) => {
    if (isEcho(text)) return;
    picked.current = null;
    props.onChange(text, e);
  }, [props.onChange]);

  const defSelected = props.val && props.val.customOption ? props.val.customOption.label :
    ( props.val ? [props.val] : [] );

  return (
    
    <AsyncTypeahead
      id="get-value-from-db"
      ref={ typeahead }
      isLoading={ isLoading }
      minLength={1}
      options={ options }
      multiple={ false }
      placeholder="Add a value"
      onSearch={handleSearch}
      onChange={handleChange}
      onInputChange={handleInputChange}
      defaultSelected={ defSelected }
      renderMenuItemChildren={ label => (
        // long-text fields (e.g. gennotes) have whole paragraphs as values
        <span title={ label.length > 80 ? label : undefined }>
          { label.length > 80 ? label.replace(/\s+/g, ' ').slice(0, 80) + '…' : label }
        </span>
      )}
      />
  );
}
