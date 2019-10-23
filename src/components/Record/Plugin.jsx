import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

import Cfg from '../Services/Cfg/Cfg';
import RecordCell from './RecordCell';
import PluginBiblio from './PluginBiblio';
import PluginShelfmarks from './PluginShelfmarks';
import PluginToponyms from './PluginToponyms';



class Plugin extends Component {

  render() {

    if (this.props.data.data.length < 1) {
      return null;
    }

    if(this.props.data.metadata.tb_id === 'paths__m_biblio'){
      return <PluginBiblio data={ this.props.data } />
    }
    if(this.props.data.metadata.tb_id === 'paths__m_shelfmarks'){
      return <PluginShelfmarks data={ this.props.data } />
    }
    if(this.props.data.metadata.tb_id === 'paths__m_toponyms'){
      return <PluginToponyms data={ this.props.data } />
    }

    return (
      <div className="plugins">

        <Card className="mt-2">
          <CardHeader><h5>{ this.props.data.metadata.tb_label }</h5></CardHeader>
          {
            this.props.data.data.map( (d, di) =>{
              return (<CardBody key={di} className="border border-info mb-2">{
                /**
                 * Fields listed in Cfg.hidden and sort fields are not shown
                 */
                  Object.keys(d).map( (f, fi) => {
                    if (
                      Cfg.hidden.indexOf(this.props.data.metadata.tb_stripped + '.' + f) > -1
                      ||
                      f === 'sort'
                      ){
                      return null;
                    }
                    
                    if (d[f].label){
                      return <RecordCell val={ d[f].val_label ? d[f].val_label : d[f].val } label={ d[f].label } key={fi} />
                    } else {
                      return null;
                    }
                  })
                }<hr /></CardBody>)
            } )
          }
        </Card>
      </div>
    );
  }
}

export default Plugin;
