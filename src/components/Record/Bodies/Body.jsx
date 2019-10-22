import React, { Component } from 'react';

import Cfg from '../../Services/Cfg/Cfg';
import RecordCell from '../RecordCell';
import Plugin from '../Plugin';
import Loading from '../../Loading/Loading';
import ManuscriptsBody from './ManuscriptsBody';


export default class ViewOne extends Component {

  renderTemplate(rec) {

    switch (rec.metadata.tb_stripped) {
      case 'manuscripts':
        return (<ManuscriptsBody rec={ rec } /> )
      default:
        return(
          <div>
            {
              Object.values(rec.core).map( (i, k) => {
                if (Cfg.hidden.indexOf(rec.metadata.tb_stripped + '.' + i.name) > -1){
                  return null;
                }
                return <RecordCell
                    coptic= { Cfg.coptic.indexOf(rec.metadata.tb_stripped + '.' + i.name) > -1}
                    greek= { Cfg.greek.indexOf(rec.metadata.tb_stripped + '.' + i.name) > -1}
                    label={ i.label }
                    name={ i.name }
                    val={ i.val_label ? i.val_label : i.val }
                    key={k} />
              })
            }
            {
              Object.keys(rec.plugins).map( (t, k) => {
                return  <Plugin key={k} data={rec.plugins[t]} />
              })
            }
          </div>
        )
    }
  }

  render() {
    if (!this.props.rec) {
      return <div className="m-5 p-5"><Loading /></div>;
    }

    return (
      <div className="mb-5">
        { this.renderTemplate(this.props.rec) }
      </div>
    );
  }
}
