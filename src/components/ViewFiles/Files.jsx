import React, { Component } from 'react';

import MoreImages from './MoreImages';
import PreviewModal from './PreviewModal';


export default class Files extends Component {

  render() {
    let files = this.props.files || [];

    files = files.map( f => {
      if (['jpg', 'png', 'gif', 'tif', 'tiff', 'jpeg'].includes(f.ext.toLowerCase())){
        return f;
      } else {
        return false;
      }
    }).filter(e => { return e; });
    const firstFiles = files.slice(0,3);
    const otherFiles = files.slice(3);

    if(firstFiles.length < 1){
      return null;
    }

    return (

      <div className="mt-3">
        <h5>Attached images</h5>
        {
          firstFiles.map( (f, id) => {
            return <PreviewModal key={id}
              file={this.props.baseUrl.replace('/api/', '/projects/') + 'files/' + f.id + '.' + f.ext} description={f.description} />
          })
        }
        <MoreImages files={otherFiles} baseUrl={this.props.baseUrl} />
      </div>

    );
  }
}
