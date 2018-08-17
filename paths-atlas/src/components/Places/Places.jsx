import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import SubHead from '../SubHead/SubHead';
import TextMd from './PlacesText.md';

class PlacePage extends Component {

  constructor(props) {
    super(props)
    this.state = { text: null }
  }
  componentWillMount() {
    fetch(TextMd).then((response) => response.text()).then((text) => {
      this.setState({ text: text })
    })
  }

  showContent(){
    if (!this.state.text){
      return (<div>Loading...</div>);
    } else {
      return (<ReactMarkdown source={this.state.text} escapeHtml={false} />);
    }
  }

render() {

  return (
    <div>
      <div>
        <img className="img-fluid" src={ window.location.origin + '/img/marea.jpg' } alt="Marea" />
      </div>

      <SubHead tblabel="Places" tb="places" text="Introduction" />

      <div className="container">
        <div className="my-3 px-5" style={{ columnCount: 2, columnGap: '5rem' }}>
          { this.showContent() }
        </div>
      </div>
    </div>
  );
  }
}

export default PlacePage;
