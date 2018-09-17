import React, { Component } from 'react';

import { Card, CardBody, CardImg, Button } from 'reactstrap';

class Caption extends Component {
  render(){
    if (!this.props.text){
      return null;
    }
    return (<CardBody className="text-secondary" style={{ fontSize: '.9rem', fontStyle: 'italic'}}>{this.props.text}</CardBody>);
  }
}

class MoreImages extends Component {
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
            return <Card className="mt-1" key={id}>
              <CardImg top width="100%" src={this.props.baseUrl.replace('/api/', '/projects/') + 'files/' + f.id + '.' + f.ext} />
              <Caption text={f.description} />
            </Card>
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

class Files extends Component {

  render() {
    const files = this.props.files || [];
    const firstFiles = files.slice(0,3);
    const otherFiles = files.slice(3);

    return (
      <div>
        {
          firstFiles.map( (f, id) => {
            return <Card className="mt-1" key={id}>
              <CardImg top width="100%" src={this.props.baseUrl.replace('/api/', '/projects/') + 'files/' + f.id + '.' + f.ext} />
              <Caption text={f.description} />
            </Card>
          })
        }

        <MoreImages files={otherFiles} baseUrl={this.props.baseUrl} />
      </div>

    );
  }
}

export default Files;
