import React from "react";
import ReactMarkdown from 'react-markdown';
import './Cite.css';


import cite from './Cite.md';
import Loading from '../Loading/Loading';


export default class Cite extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      text: false
    }
  }
  componentWillMount() {
    fetch(cite).then((response) => response.text()).then((text) => {
      this.setState({ text: text });
    });
  }

  showContent(){
    if (!this.state.text){
      return (<Loading />);
    } else {
      return (
        <div className="text-justify">
          <ReactMarkdown source={this.state.text} escapeHtml={false} />
        </div>
      );
    }
  }

  render(){
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <h1>How to cite the “PAThs” project as a whole and the single database records</h1>
          </div>
        </div>
        <div className="container">
          <div className="my-5 px-5">
            { this.showContent() }
          </div>
        </div>
      </div>
    );
  }
}
