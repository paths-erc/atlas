import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Matrix from 'quirematrix';

const uid = Math.random().toString(36).substr(2, 5);

class QuireMatrixView extends Component {

  componentDidMount(){
    const string = this.props.string;
    const m = new Matrix('canvas'  + uid);
    m.parseString(string, 'secondHalf' + uid);
  }
  render() {
    const height = 100 + this.props.string.length / 3 * 20;
    return (
      <div className="mt-2 mb-4">
        <Row>
          <Col id="firstHalf">{ this.props.string }</Col>
          <Col id={ 'secondHalf' + uid }></Col>
        </Row>
        <canvas width="400" height={ height } id={ 'canvas'+ uid }></canvas>
      </div>

    );
  }
}


export default QuireMatrixView;
