import React from "react";
import ReactMarkdown from 'react-markdown/with-html';

import imgPathsLogo from './paths-logo.png';

import intro from './IntroMd.md';
import missionstatement from './MissionStatementMd.md';
import lod from './lod.md';
import Loading from '../Loading/Loading';


export default class Home extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      text: {},
      titles: [
        {
          id    : 'intro',
          title : "Introduction",
          path  : intro
        },
        {
          id    : 'missionstatement',
          title : "Mission Statement",
          path  : missionstatement
        },
        {
          id    : 'lod',
          title : "Linked Open Data",
          path  : lod
        }
      ]
    }
  }
  componentWillMount() {
    this.state.titles.map( e => {
      fetch(e.path).then((response) => response.text()).then((text) => {
        const o = this.state.text;
        o[e.id] = text;
        this.setState({ text: o });
      });
      return true;
    });

  }

  showContentAndToc(){
    if (this.state.text === {} ){
      return (<Loading />);
    } else {
      return (
        <div>
          <div className="border p-3 d-inline-block bg-light float-right ml-5 mb-5 shadow">
            <h4>Table of contents</h4>
            <ul className="p-0 m-0">
              {this.state.titles.map( (k, i) =>{
                return (
                  <li key={i} style={{ listStyle: 'none' }}>
                    <a href={ '#' + k.id }>{ k.title }</a>
                  </li>
                );

              })}
            </ul>
          </div>
          { this.state.titles.map( (k, i) =>{
            return (
              <div key={i} className="text-justify">
                <h1 id={ k.id } className="mt-5">{ k.title }</h1>
                <ReactMarkdown source={this.state.text[k.id]} escapeHtml={false} />
              </div>
            );
          })}
        </div>
      );
    }
  }

  render(){
    return (
      <div>
        <div className="jumbotron">
          <div className="container text-center">
            <img className="img-fluid shadow-lg" src={ imgPathsLogo } alt="Tracking Papyrus and Parchment Paths. An Archaeological Atlas of Coptic Literature. Literary Texts in their Geographical Context: Production, Copying, Usage, Dissemination and Preservation" />
          </div>
        </div>
        <div className="container">
          <div className="my-5 px-5">
            { this.showContentAndToc() }
          </div>
        </div>
      </div>
    );
  }
}
