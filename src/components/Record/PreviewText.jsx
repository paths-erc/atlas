import React, { Component } from 'react';
import { Button } from 'reactstrap';
import nl2br from 'react-nl2br';
import relaxedSplit from '../Utils/relaxedSplit.jsx';
import internalLinks from '../Utils/internalLinks.jsx';


const parseText = (text) => {
  const nltext = nl2br(text);
  const linktext = nltext.map( (t, i) => {
    if (typeof t === 'string'){
      return <span className="internal-link" key={i} dangerouslySetInnerHTML={{ __html: internalLinks(t) }}></span>;
    } else {
      return t;
    }
  });
  return linktext;
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
    const textParts = relaxedSplit(this.props.text, 200, this.props.separator);
    if (!textParts[1]){
      return parseText(textParts[0]);
    }

    return (
      <span>{ parseText(textParts[0]) }
        <span style={{ display: this.state.display }}>{ parseText(textParts[1]) }</span>
        {this.state.display === 'none' ? '\u2026' : ''}
        <Button color="info" size="sm" className="ml-3" onClick={ this.toggleDisplay }>
          {this.state.display === 'none' ? '+' : '-'}
        </Button>
      </span>
    )
  }
}
