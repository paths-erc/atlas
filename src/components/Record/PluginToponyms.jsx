import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ToggleText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display : 'none'
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }


  toggleDisplay(){
    this.setState({
      display: this.state.display === 'none' ? 'inline' : 'none'
    });
  }

  render() {
    return (
      <span>
        <span style={{ display: this.state.display }} className="ml-3 bg-light text-muted p-2">{ this.props.text }</span>
        <Button color="info" size="sm" className="ml-3" onClick={ this.toggleDisplay }>
          {this.state.display === 'none' ? <FontAwesomeIcon icon="info" /> : '<'}
        </Button>
      </span>
    )
  }
}

class TopoCell extends Component{

  render(){
    const tot = this.props.data.length;
    return (<div>
      {this.props.data.map( (d, di) =>{
        return <span className={'mr-2 pr-2' + (tot === di+1 ? '' : ' border-right border-warning')} key={di}>
          <span className={ d.language.val ? d.language.val.toLowerCase() : '' } title={d.notes.val}>
            { d.toponym.val }{'\u0020'}
          </span>
          { d.transcription.val ? <span className="text-muted ml-2">[{d.transcription.val}]</span> : ''}
          { d.notes.val ? <ToggleText text={ d.notes.val } /> : ''}
        </span>
      })}
    </div>);
  }
};

export default class PluginToponyms extends Component {

  parseNames(rows){
    let obj = {};

    rows.forEach( (d, di) =>{
      if (!obj[d.language.val]){
        obj[d.language.val] = []
      }
      obj[d.language.val].push(d);
    });

    return Object.keys(obj).map((l, i) => {
      return <Row className={"border-bottom mt-2 mb-2 pb-1" } key={i}>
        <Col sm="4" md="3">
          <label className="font-weight-bold">{l}</label>
        </Col>
        <Col>
          <div>
            <TopoCell data={obj[l]} />
          </div>
        </Col>
	    </Row>
    });
  }

  render() {

    return (
      <div className="plugins">
        <Card className="mt-2">
          <CardHeader><h5>{ this.props.data.metadata.tb_label }</h5></CardHeader>
          <CardBody>
            { this.parseNames(this.props.data.data) }
          </CardBody>
        </Card>
      </div>
    )
  }
}
