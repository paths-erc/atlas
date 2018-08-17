import React from "react";
import ReactMarkdown from 'react-markdown';

import TextMd from './HomeText.md';
import imgPathsLogo from './paths-logo.png';

export default class Home extends React.Component{

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

  render(){
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <img className="img-fluid" src={ imgPathsLogo } alt="Tracking Papyrus and Parchment Paths. An Archaeological Atlas of Coptic Literature. Literary Texts in their Geographical Context: Production, Copying, Usage, Dissemination and Preservation" />
          </div>
        </div>
        <div className="container">
          <div className="my-3 px-5" style={{ columnCount: 2, columnGap: '5rem' }}>
            { this.showContent() }
          </div>
        </div>
      </div>
    );
  }
}
