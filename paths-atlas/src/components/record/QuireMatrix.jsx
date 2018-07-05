import React, { Component } from 'react';

class QuireMatrixView extends Component {

  render() {
    var m = new Matrix('canvas');
    m.observeInput('input', 'second_half');
    m.parseString(val, secondHalfId)

    return (
      <div>
        {
          files.map( (f, id) => {
            return <Card className="mt-1" key={id}>
              <CardImg top width="100%" src={this.props.baseUrl.replace('/api/', '/projects/') + 'files/' + f.id + '.' + f.ext} />
              { this.showDescription(f.description) }
            </Card>
          })
        }
      </div>

    );
  }
}

class QuireMatrixObserve extends Component {

  render() {
    var m = new Matrix('canvas');
    m.observeInput('input', 'second_half');
    m.parseString(val, secondHalfId)

    return (
      <div>
        {
          files.map( (f, id) => {
            return <Card className="mt-1" key={id}>
              <CardImg top width="100%" src={this.props.baseUrl.replace('/api/', '/projects/') + 'files/' + f.id + '.' + f.ext} />
              { this.showDescription(f.description) }
            </Card>
          })
        }
      </div>

    );
  }
}

export {QuireMatrixView, QuireMatrixObserve};
