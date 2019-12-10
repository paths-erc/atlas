import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import './ColophonText.css';

const formatColophon = (xml) => {

  let text = xml.match(/<body>(.*)<\/body>/si)[1];
  
  // Remove 2+ white spaces
  text = text.replace(/\s{2,}/gmi, ' ').replace(/\|/gmi, '\n');
  
  // Remove line numbers
  text = text.replace(/\([0-9]{1,2}\)/gmi, '');

  // Remove PAThs tags
  text = text.replace(/<\/?\b(?:roleName|p|date|gap|org|quote|rs)\b[^>]*>/gmi, '');

  // Trim text
  text = text.replace(/^\s+|\s+$/g, '');

  // Convert tags to link
  text = text.replace(/<\s*(?:place|pers)Name[^>]*ref="([^"]+)"[^>]*>(.*?)<\s*\/\s*(?:place|pers)Name>/gi, (match, ref, content) => {
    const ref_parts = ref.split('.');
    if (!ref_parts[1] || !ref_parts[2]){
        return content;
    }
    return `<a href="/${ref_parts[1]}/${ref_parts[2]}">${content}</a>`;
    // return <a onClick={()=>{ history.push(`/${ref_parts[1]}/${ref_parts[2]}`)} } href="#" target="_blank" rel="noreferrer noopener">{content}</a>;
  });

  return text;
}


export default function ColophonText(props) {

  const clph = props.colophon;

  const [clphText, setClphText] = useState();


  useEffect( () => {
    axios
      .get(`https://raw.githubusercontent.com/paths-erc/coptic-texts/master/colophons/paths.colophons.${clph}.xml`)
      .then( xml => {
        const parsedtext = formatColophon(xml.data);
        setClphText(parsedtext);
      })
      .catch( e => {
        console.log(e);
      })
  }, [clph]);


  
  if (!clphText){
    return <Loading>Loading the marked text of the colophon #{clph}</Loading>;
  }

  return (
    <div>
      <ol className="colophons">
      { clphText.split('\n').map( (line, key) => {
        return <li key={key} dangerouslySetInnerHTML={{ __html: line.trim() }} />
      } ) }
      </ol>
    </div>
  );
}
