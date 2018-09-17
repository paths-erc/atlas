import React, { Component } from 'react';

import MoreImages from './MoreImages';
import PreviewModal from './PreviewModal';


export default class Files extends Component {

  render() {
    const files = this.props.files || [];
    const firstFiles = files.slice(0,3);
    const otherFiles = files.slice(3);

    return (
      <div>
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
