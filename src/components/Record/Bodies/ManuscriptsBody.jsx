import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Cfg from '../../Services/Cfg/Cfg';
import RecordCell from '../RecordCell';
import Plugin from '../Plugin';


export default class ViewOne extends Component {

  render() {
    const rec = this.props.rec;
    let loaded_plg = [];

    return (
      <div>
        {
          Object.values(rec.core).map( (i, k) => {
            if (Cfg.hidden.indexOf(rec.metadata.tb_stripped + '.' + i.name) > -1){
              return null;
            }
            if(i.name === 'alias'){
              loaded_plg.push('paths__m_shelfmarks');
              return (
                <div key={k}>
                  <RecordCell
                      coptic= { Cfg.coptic.indexOf(rec.metadata.tb_stripped + '.' + i.name) > -1}
                      greek= { Cfg.greek.indexOf(rec.metadata.tb_stripped + '.' + i.name) > -1}
                      label={ i.label }
                      val={ i.val_label ? i.val_label : i.val }
                      />
                    <Row key={k} className="border-bottom mb-2 pb-2">
                      <Col>
                        { rec.plugins['paths__m_shelfmarks'] && <Plugin data={rec.plugins['paths__m_shelfmarks']} />}
                      </Col>
                    </Row>
                  </div>
              )
            }
            return <RecordCell
                coptic= { Cfg.coptic.indexOf(rec.metadata.tb_stripped + '.' + i.name) > -1}
                greek= { Cfg.greek.indexOf(rec.metadata.tb_stripped + '.' + i.name) > -1}
                label={ i.label }
                val={ i.val_label ? i.val_label : i.val }
                key={k} />
          })
        }
        {
          Object.keys(rec.plugins).map( (t, k) => {
            if(loaded_plg.includes(t)){
              return null;
            }
            return  <Plugin key={k} data={rec.plugins[t]} />
          })
        }
      </div>
    );
  }
}
