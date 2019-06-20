import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import './Cite.css';


import cite from './Cite.md';
import Loading from '../Loading/Loading';


export default function Cite(){

  const [html, setHtml] = useState(<Loading />);

  useEffect( ()=> {
    fetch(cite).then((response) => response.text()).then((text) => {
      setHtml(<ReactMarkdown source={text} escapeHtml={false} />);
    });
  }, []);

  return (
    <div>
      <div className="jumbotron">
        <div className="container text-center">
          <h1>How to cite the “PAThs” project as a whole and the single database records</h1>
        </div>
      </div>
      <div className="container">
        <div className="my-5 px-5 cite">
          { html }
        </div>
      </div>
    </div>
  );
}
