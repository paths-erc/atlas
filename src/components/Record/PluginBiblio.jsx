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
                  <a href={'https://www.zotero.org/groups/2189557/erc-paths/items/itemKey/' + d.zotero.val} target="_blank">
                    {d.short.val} { d.details.val ? ', ' + d.details.val : ''}
                  </a>;
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
