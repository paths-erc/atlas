import React, { Component } from 'react';

import MoreImages from './MoreImages';
import PreviewModal from './PreviewModal';


export default class Files extends Component {

  render() {
    let files = Object.values(this.props.files) || [];

    files = files.map( f => {
      // bdus v5 flags images itself (`is_image`); the extension list is a fallback.
      // Images were converted to webp, so it must be accepted.
      if (f.is_image || ['jpg', 'png', 'gif', 'tif', 'tiff', 'jpeg', 'webp'].includes((f.ext || '').toLowerCase())){
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
          firstFiles.map( f => {
            return <PreviewModal key={f.id} file={f} />
          })
        }
        <MoreImages files={otherFiles} />
      </div>

    );
  }
}
