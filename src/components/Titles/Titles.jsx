import React, { Component } from 'react';
import ReactMarkdown  from 'react-markdown';
import TextMd from './TitlesText.md';

import SubHead from '../SubHead/SubHead';
import Loading from '../Loading/Loading';

class TitlePage extends Component {

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
      return (<ReactMarkdown source={this.state.text} />);
    }
  }

  render() {
    return (
      <div>
        <SubHead tblabel="Titles" tb="titles" text="Introduction on Titles of Coptic Manuscripts" />
        <div className="container">
          <div className="my-3 px-md-5 double-column">
            { this.showContent() }
          </div>
        </div>
  		</div>
    );
  }
}

export default TitlePage;
