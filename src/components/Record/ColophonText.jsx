import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import './ColophonText.css';
// import { JSDOM } from 'jsdom';

const formatColophon = (xml) => {
  // Replace 2+ white spaces with single one
  xml = xml.replace(/\s{2,}/gmi, ' ')
  // replace | with new lines
  xml = xml.replace(/\|/gmi, '\n');
  // Remove line numbers
  xml = xml.replace(/\([0-9]{1,2}\)/gmi, '')
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml.trim(), "application/xml");
  doc.querySelectorAll('roleName,persName,date,gap,org,quote,rs,b').forEach(e => e.replaceWith(e.innerHTML));
  doc.querySelectorAll('placeName, persName').forEach(e => {
    const ref_parts = e.getAttribute('ref').split('.');
    if (!ref_parts[0] && !ref_parts[1]) {
      return e.innerHTML;
    }
    return `<a href="/${ref_parts[1]}/${ref_parts[2]}">${content}</a>`;
  });
  const allParagraphs = Array.from(doc.querySelectorAll('body p')).map(e => {
    return {
      fol: e.getAttribute('fol'),
      content: e.innerHTML.trim()
    }
  });
  return allParagraphs;
}


export default function ColophonText(props) {

  const clph = props.colophon;

  const [clphText, setClphText] = useState();


  useEffect(() => {
    axios
      .get(`https://raw.githubusercontent.com/paths-erc/coptic-texts/master/colophons/paths.colophons.${clph}.xml`)
      .then(xml => {
        const parsedtext = formatColophon(xml.data);
        setClphText(parsedtext);
      })
      .catch(e => {
        setClphText(`Error in getting marked text of colophon #${clph}`)
        console.log(e);
      })
  }, [clph]);



  if (!clphText) {
    return <Loading>Loading the marked text of the colophon #{clph}</Loading>;
  }

  return (
    <div>
      {
        clphText.map((p, k) => {
          return <React.Fragment key={k}>
            <small>fol. {p.fol}</small>
            <ol className='colophons'>
              {p.content.split('\n').map((line, key) => {
                return <li key={key} dangerouslySetInnerHTML={{ __html: line.trim() }} />
              })}
            </ol>
          </React.Fragment>
        })
      }
    </div>
  );
}
