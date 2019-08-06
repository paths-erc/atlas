import React, { Component } from 'react';
import { Button } from 'reactstrap';
import nl2br from 'react-nl2br';


const add_db_links = (text) => {
  return text.replace(
    /@([a-z]+)\.([a-z0-9/]+)(\[([^\]]+)\])?/gi,
    function(match, p1, p2, p3, p4, offset, string){
      return `<a href="/${p1}/${p2}">
        ${ p3 && p4 ? p4 : `paths.${p1}.${p2}` }
      </a>`;
    });
};

const parseText = (text) => {
  const nltext = nl2br(text);
  const linktext = nltext.map( (t, i) => {
    if (typeof t === 'string'){
      return <span key={i} dangerouslySetInnerHTML={{ __html: add_db_links(t) }}></span>;
    } else {
      return t;
    }
  });

  return linktext;
}

const relaxedSplit = (str, offset, until = '.') => {

  if (!str || str.length <= offset){
    return [str, false];
  }
  const str1 = str.substr(0, offset);

  if (str1.substr(str1.length - 1) === until){
    return [str1, false];
  }

  const start = str1 + '' + str.replace(str1, '').split(until)[0];
  const cont = str.replace(start + '' + until, '');
  return [
    start + until,
    cont === start ? false : cont
  ];
};




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
