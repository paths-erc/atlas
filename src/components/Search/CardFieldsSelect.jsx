import React from 'react';
import Select from 'react-select';
import { Button } from 'reactstrap';

import Cfg from '../Services/Cfg/Cfg';
import { MAX_FIELDS } from '../Services/CardFields';

/**
 * Lets the user choose which fields are shown in the result cards.
 * Only fields already approved for search (Cfg.fld_whitelist) and not hidden
 * in the record view (Cfg.hidden) are offered, besides the default ones.
 *
 * @param {String}   props.tb        Table name, no prefix
 * @param {String[]} props.selected  Chosen fields, or null for the defaults
 * @param {String[]} props.defaults  Default preview fields for the table
 * @param {Object}   props.labels    Field labels keyed `table:field`, null while loading
 * @param {Function} props.onChange  Called with an array of fields, or null to reset
 */
export default function CardFieldsSelect({ tb, selected, defaults, labels, onChange }) {
  if (!labels) {
    return null;
  }

  const allowed = Cfg.fld_whitelist
    .filter(f => f.startsWith(`${tb}:`))
    .map(f => f.split(':')[1])
    .filter(f => !Cfg.hidden.includes(`${tb}.${f}`));

  const names = Array.from(new Set([...(defaults || []), ...allowed]));
  const toOption = f => ({ value: f, label: labels[`${tb}:${f}`]?.label || f });
  const options = names.map(toOption);
  const current = (selected || defaults || []).map(toOption);

  return (
    <div className="d-flex align-items-start mt-3" style={{ gap: '.5rem' }}>
      <div className="flex-grow-1">
        <Select
          isMulti
          aria-label="Fields shown in the result cards"
          placeholder="Fields shown in the cards…"
          options={options}
          value={current}
          isClearable={false}
          isOptionDisabled={() => current.length >= MAX_FIELDS}
          noOptionsMessage={() => `At most ${MAX_FIELDS} fields`}
          onChange={vals => onChange(vals && vals.length > 0 ? vals.map(v => v.value) : null)}
        />
      </div>
      <Button
        color="secondary"
        outline
        size="sm"
        className="mt-1"
        disabled={!selected}
        onClick={() => onChange(null)}
      >
        Reset
      </Button>
    </div>
  );
}
