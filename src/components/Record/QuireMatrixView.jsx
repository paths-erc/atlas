import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Matrix from 'quirematrix';

class QuireMatrixView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid : Math.random().toString(36).substr(2, 5)
    };
  }

  componentDidMount(){
    if(this.props.string !== null){
      const m = new Matrix('canvas'  + this.state.uid);
      m.parseString(this.props.string, 'secondHalf' + this.state.uid);
    }
  }

  render() {
    let height = false;
    if(this.props.string !== null){
      height = 100 + this.props.string.length / 3 * 20;
    }
    return (
      <div className="mt-2 mb-4">
        <Row>
          <Col id="firstHalf">{ this.props.string }</Col>
          <Col id={ 'secondHalf' + this.state.uid }></Col>
        </Row>
        { height && <canvas width="400" height={ height } id={ 'canvas'+ this.state.uid }></canvas> }
      </div>
    );
  }
}


export default QuireMatrixView;
