import React, { useState } from 'react';
import { Button } from 'reactstrap';
import nl2br from 'react-nl2br';
import relaxedSplit from '../Utils/relaxedSplit.jsx';
import internalLinks from '../Utils/internalLinks.jsx';


const parseText = (text) => {
  const nltext = nl2br(text);
  const linktext = nltext.map( (t, i) => {
    if (typeof t === 'string'){
      return <span className="internal-link" key={i} dangerouslySetInnerHTML={{ __html: internalLinks(t) }}></span>;
    } else {
      return t;
    }
  });
  return linktext;
}

const getExternalLink = (service, val) => {
  const map = {
    "tm": `https://www.trismegistos.org/text/${ val.trim() }`,
    "tmgeo": `https://www.trismegistos.org/place/${ val.trim() }`,
    "pleiades": `https://pleiades.stoa.org/places/${ val.trim() }`,
    "ldab": `https://www.trismegistos.org/ldab/text.php?quick=${ val.trim() }`,
    "coptot": `http://coptot.manuscriptroom.com/manuscript-catalog/?gaNum=${ encodeURIComponent(val.trim()) }`,
    "colophons": `https://github.com/paths-erc/coptic-texts/blob/master/colophons/paths.colophons.${val.trim()}.xml`,
    "dbmnt": `http://www.dbmnt.uw.edu.pl/${val.trim()}`
  };

  if (typeof map[service] !== undefined){
    return map[service];
  } else {
    return false;
  }
};


export default function PreviewText(props) {

  const text = props.text;
  const separator = props.separator;
  const fld = props.fld;

  const [display, setDisplay] = useState('none');

  const linkedText = text.split(',').map( (t, key) => {
    const link = getExternalLink(fld, t);
    if (link){
      return <a href={ link } key={ key } target="_blank" rel="noopener noreferrer">
        {t};
      </a>
    } else {
      return false;
    }
  }).filter( el => el );
  if (linkedText.length > 0){
    return linkedText;
  }




  const toggleDisplay = () => {
    setDisplay( display === 'none' ? 'inline' : 'none' );
  }

  const textParts = relaxedSplit(text, 200, separator);
  if (!textParts[1]){
    return parseText(textParts[0]);
  }

  return (
    <span>{ parseText(textParts[0]) }
      <span style={{ display: display }}>{ parseText(textParts[1]) }</span>
      { display === 'none' ? '\u2026' : '' }
      <Button color="info" size="sm" className="ml-3" onClick={ toggleDisplay }>
        { display === 'none' ? '+' : '-'}
      </Button>
    </span>
  );
}
