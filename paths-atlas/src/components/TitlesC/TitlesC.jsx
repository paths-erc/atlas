import React, { Component } from 'react';
import ReactMarkdown  from 'react-markdown';
import TitlesMdPath  from './TitlesText.md';

import SubHead from '../SubHead/SubHead';

class TitlePage extends Component {

  constructor(props) {
    super(props)
    this.state = { text: null }
  }
  componentWillMount() {
    fetch(TitlesMdPath).then((response) => response.text()).then((text) => {
      this.setState({ text: text })
    })
  }

  showContent(){
    if (!this.state.text){
      return (<div>Loading...</div>);
    } else {
      return (<ReactMarkdown source={this.state.text} />);
    }
  }

  render() {
    return (
      <div>
        <SubHead tblabel="Titles" tb="titles" text="Introduction on Titles of Coptic Manuscripts" />
        <div className="container mt-5 px-5">
          { this.showContent() }
        </div>
  		</div>
    );
  }
}

export default TitlePage;
