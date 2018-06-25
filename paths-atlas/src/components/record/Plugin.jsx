import React, { Component } from 'react';

import { Card, CardHeader, CardBody } from 'reactstrap';

import RecordCell from './recordCell';

import Cfg from '../services/Cfg/Cfg';



class Plugin extends Component {

  render() {
    const name = this.props.name.replace('paths__', '');
    const data = this.props.data;

    return (
      <div className="plugins">
        <Card className="mt-2">
          <CardHeader><h5>{ Cfg[name].label }</h5></CardHeader>
          {
            data.map( (d, di) =>{
              return (<CardBody key={di} className="border border-info mb-2">{
                  Object.keys(d).map( (f, fi) => {
                    if ( Cfg[name].fields[f] ) {
                      return <RecordCell val={d[f]} label={ Cfg[name].fields[f].label } key={fi} />
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
