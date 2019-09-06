import React from "react";
import './Cite.css';


import cite from './Cite.md';
import ReactMarkdownPath from '../ReactMarkdownPath/ReactMarkdownPath';


export default function Cite(){

  return (
    <div>
      <div className="jumbotron">
        <div className="container text-center">
          <h1>How to cite the “PAThs” project as a whole and the single database records</h1>
        </div>
      </div>
      <div className="container">
        <div className="my-5 px-5 cite">
          <ReactMarkdownPath path={cite} />
        </div>
      </div>
    </div>
  );
}
