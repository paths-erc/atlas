import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

export default class PluginBiblio extends Component {

  render() {

    return (
      <div className="plugins">

        <Card className="mt-2">
          <CardHeader><h5>{ this.props.data.metadata.tb_label }</h5></CardHeader>
          <CardBody>
          {
            this.props.data.data.map( (d, di) =>{
              return (
                <span key={di} className="mr-2">
                  {d.institution.val}
                  { d.shelfmark.val ? ', ' + d.shelfmark.val : ''}
                  { d.pp.val ? ', ' + d.pp.val : ''};
                </span>
              )
            })
          }
          </CardBody>
        </Card>
      </div>
    )
  }
}
