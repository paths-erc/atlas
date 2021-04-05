import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

function showLink(zotero, short){
  if (zotero){
    return (<a href={'https://www.zotero.org/groups/2189557/erc-paths/items/itemKey/' + zotero} target="_blank" rel="noopener noreferrer">{short}</a>)
  } else {
    return short;
  }
}

export default class PluginBiblio extends Component {

  render() {

    const data = this.props.data.data;
    const metadata = this.props.data.metadata;

    return (
      <div className="plugins">

        <Card className="mt-2">
          <CardHeader><h5>{ metadata.tb_label }</h5></CardHeader>
          <CardBody>
          {
            Object.values(data).map( (d, di) =>{
              return (
                <span key={di} className="mr-3">
                  { showLink(d.zotero.val, d.short.val) }
                  { d.details.val ? (', ' + d.details.val) : ''}
                  { d.images.val ? (` [${d.images.val}];`) : ';'}
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
