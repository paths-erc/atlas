import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown/with-html';


import Loading from '../Loading/Loading';




export default function ReactMarkdownPath(props){

  const [mdText, setMdtext] = useState();

  useEffect( () => {
    async function getMd(path){
      await fetch(path).then((response) => response.text()).then((text) => {
        setMdtext(text);
      });
    }
    getMd(props.path);
  } );

  if (mdText){
    return <ReactMarkdown source={mdText} escapeHtml={false} />;
  } else {
    return <Loading />
  }
}
