import React from "react";

import ReactMarkdownPath from '../ReactMarkdownPath/ReactMarkdownPath';
import api from './Api.md';

export default function Api(){

  return (
    <div>
      <div className="jumbotron">
        <div className="container text-center">
          <h1>PAThs API & Data export</h1>
        </div>
      </div>
      <div className="container">
        <div className="my-5 px-5">
          <ReactMarkdownPath path={api} />
        </div>
      </div>
    </div>
  );
}
