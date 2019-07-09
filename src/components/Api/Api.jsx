import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

import api from './Api.md';
import Loading from '../Loading/Loading';

export default function Api(){

  const [html, setHtml] = useState(<Loading />);

  useEffect( ()=> {
    fetch(api).then((response) => response.text()).then((text) => {
      setHtml(<ReactMarkdown source={text} escapeHtml={false} />);
    });
  }, []);

  return (
    <div>
      <div className="jumbotron">
        <div className="container text-center">
          <h1>PAThs API & Data export</h1>
        </div>
      </div>
      <div className="container">
        <div className="my-5 px-5">
          { html }
        </div>
      </div>
    </div>
  );
}
