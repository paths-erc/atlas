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
      return e.innerHTML.trim();
    }
    return `<a href="/${ref_parts[1]}/${ref_parts[2]}">${e.innerHTML.trim()}</a>`;
  });
  const allParagraphs = Array.from(doc.querySelectorAll('body p')).map(e => {
    return {
      fol: e.getAttribute('fol'),
      content: e.innerHTML.trim()
    }
  });
  return allParagraphs;
}

/**
 * Component to render a single colophon text item.
 * @param {Object} props - The properties object.
 * @param {Object} props.paragraph - The colophon text item.
 * @returns {JSX.Element} The rendered colophon text item.
 */
const ColophonTextItem = ({ paragraph }) => (
  <React.Fragment>
    {paragraph.fol && <small>fol. {paragraph.fol}</small>}
    <ol className='colophons'>
      {paragraph.content.split('\n').map((line, key) => (
        <li key={key} dangerouslySetInnerHTML={{ __html: line.trim() }} />
      ))}
    </ol>
  </React.Fragment>
);

/**
 * Component to render the colophon text.
 * @param {Object} props - The properties object.
 * @param {string} props.clph - The colophon identifier.
 * @param {Array} props.clphText - The colophon text data.
 * @returns {JSX.Element} The rendered colophon text.
 */
const ColophonText = ({ clph, clphText }) => {
  if (!clphText) {
    return <Loading>Loading the marked text of the colophon #{clph}</Loading>;
  }

  return (
    <div>
      {clphText.map((p, k) => (
        <ColophonTextItem key={k} paragraph={p} />
      ))}
    </div>
  );
};

/**
 * Wrapper component to fetch and manage the state of the colophon text.
 * @param {Object} props - The properties object.
 * @param {number} props.colophon - The id of the colohpon to fetch.
 * @returns {JSX.Element} The rendered colophon text wrapper.
 */
export default function ColophonTextWrapper(props) {

  const clph = props.colophon;

  const [clphText, setClphText] = useState();
  const [errorText, setErrorText] = useState(null);


  useEffect(() => {
    axios
      .get(`https://raw.githubusercontent.com/paths-erc/coptic-texts/master/colophons/paths.colophons.${clph}.xml`)
      .then(xml => {
        const parsedtext = formatColophon(xml.data);
        setClphText(parsedtext);
      })
      .catch(e => {
        setErrorText(`Error in getting marked text of colophon #${clph}`)
        console.log(e);
      })
  }, [clph]);



  if (errorText) {
    return <div>{errorText}</div>;
  }

  return (
    <ColophonText clph={clph} clphText={clphText} />
  );
}
