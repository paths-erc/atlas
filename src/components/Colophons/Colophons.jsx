import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import SubHead from '../SubHead/SubHead';
import TextMd from './ColophonsText.md';
import Loading from '../Loading/Loading';

class ColophonPage extends Component {

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
      return (<Loading />);
    } else {
      return (<ReactMarkdown source={this.state.text} escapeHtml={false} />);
    }
  }

  render() {
    return (
      <div>
        <SubHead tblabel="Colophons" tb="colophons" text="Introduction" />

        <div className="container">
          <div className="my-3 px-md-5 double-column">
            { this.showContent() }
          </div>
        </div>
      </div>
    );
  }
}

export default ColophonPage;
