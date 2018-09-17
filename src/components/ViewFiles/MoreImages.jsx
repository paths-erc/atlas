import React, { Component } from 'react';
import { Button } from 'reactstrap';

import PreviewModal from './PreviewModal';

export default class MoreImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      buttonText: 'Show more images'
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      shown: !this.state.shown,
      buttonText : this.state.buttonText === 'Show more images' ? 'Hide' : 'Show more'
    });
  }

  render(){
    if (!this.props.files || this.props.files.length < 1){
      return null;
    }
    return (
      <div>
        <div style={{ display: this.state.shown ? 'block' : 'none' }}>
        {
          this.props.files.map( (f, id) => {
            return <PreviewModal key={id}
              file={this.props.baseUrl.replace('/api/', '/projects/') + 'files/' + f.id + '.' + f.ext} description={f.description} />
          })
        }
        </div>
        <div className="text-center mt-2" >
          <Button onClick={this.toggle} color="info">{ this.state.buttonText}</Button>
        </div>
      </div>
    );
  }
}
