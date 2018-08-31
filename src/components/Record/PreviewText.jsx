import React, { Component } from 'react';
import { Button } from 'reactstrap';




function relaxedSplit(str, offset, until = '.'){
  if (!str || str.length <= offset){
    return [str, false];
  }
  const str1 = str.substr(0, offset);

  if (str1.substr(str1.length - 1) === until){
    return [str1, false];
  }

  var start = str1 + '' + str.replace(str1, '').split(until)[0];
  return [
    start + until,
    str.replace(start + until, '')
  ];
}


export default class PreviewText extends Component {

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

    const textParts = relaxedSplit(this.props.text, 200, '.');
    if (!textParts[1]){
      return textParts[0];
    }

    return (
      <span>{ textParts[0] }
        <span style={{ display: this.state.display }}>{ textParts[1] }</span>
        {this.state.display === 'none' ? '\u2026' : ''}
        <Button color="info" size="sm" className="ml-3" onClick={ this.toggleDisplay }>
          {this.state.display === 'none' ? '+' : '-'}
        </Button>
      </span>
    )
  }
}
