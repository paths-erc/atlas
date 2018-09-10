import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import SubHead from '../SubHead/SubHead';
import TextMd from './AuthorsText.md';
import Loading from '../Loading/Loading';
import AuthorsImg from './authors.jpg';

class AuthorPage extends Component {

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
        <div>
          <img className="img-fluid" src={AuthorsImg} alt="Marea" />
        </div>

        <SubHead tblabel="Authors" tb="authors" text="Introduction" />

          <div className="container">
            <div className="my-3 px-md-5 double-column">
              { this.showContent() }
            </div>
          </div>
      </div>
    );
  }
}

export default AuthorPage;
