import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import RecordCell from './RecordCell';
import PluginBiblio from './PluginBiblio';


class Plugin extends Component {

  render() {

    if (this.props.data.data.length < 1) {
      return null;
    }

    if(this.props.data.metadata.tb_id === 'paths__m_biblio'){
      return <PluginBiblio data={ this.props.data } />
    }

    return (
      <div className="plugins">
        <Card className="mt-2">
          <CardHeader><h5>{ this.props.data.metadata.tb_label }</h5></CardHeader>
          {
            this.props.data.data.map( (d, di) =>{
              return (<CardBody key={di} className="border border-info mb-2">{
                  Object.keys(d).map( (f, fi) => {
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
