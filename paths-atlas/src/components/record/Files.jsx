import React, { Component } from 'react';

import { Card, CardBody, CardImg } from 'reactstrap';

class Files extends Component {

  showDescription(description){
    if (!description){
      return null;
    }
    return <CardBody>
      { description }
    </CardBody>
  }


  render() {
    const files = this.props.files || [];

    return (
      <div>
        {
          files.map( (f, id) => {
            return <Card className="mt-1" key={id}>
              <CardImg top width="100%" src={'http://db.localhost/projects/paths/files/' + f.id + '.' + f.ext} />
              { this.showDescription(f.description) }
            </Card>
          })
        }
      </div>

    );
  }
}

export default Files;
