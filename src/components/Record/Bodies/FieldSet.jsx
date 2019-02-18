import React, { Component } from 'react';

import RecordCellDb from '../RecordCellDb';

export default class FieldSet extends Component {

  render() {
    const fields = this.props.fields;
    const legend = this.props.legend;
    let show = false;
    fields.forEach( f => {
      if (typeof f.val !== 'undefined' && f.val && f.val !== ''){
        show = true;
      }
    });

    if (!show){
      return false;
    }

    return (
        <fieldset className="p-3 border border-warning mt-3">
          { legend && <legend className="border border-warning shadow-sm text-muted px-3 py-1" style={{ fontSize: '1.1rem', 'fontWeight': 'bold' }}>{ legend }</legend> }
          {
            fields.map((f,k) => {
              return (<RecordCellDb key={k} data={ f } />)
            })
          }
        </fieldset>

    );
  }
}
