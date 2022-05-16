import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'


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
  }, [props.path]);

  if (mdText){
    return <ReactMarkdown children={mdText} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />;
  } else {
    return <Loading />
  }
}
