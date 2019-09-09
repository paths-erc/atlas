/* jshint esversion: 6 */
import React from "react";
import ReactMarkdownPath from '../ReactMarkdownPath/ReactMarkdownPath';

import SubHead from '../SubHead/SubHead';

import PlacesMd from './places/places.md';
import PlacesImg from './places/places.jpg';

import ManuscriptsMd from './manuscripts/manuscripts.md';
import ManuscriptsImg from './manuscripts/manuscripts.jpg';

import WorksMd from './works/works.md';
import WorksWithoutClavisMd from './works/works-without-clavis.md';
import WorksImg from './works/works.jpg';

import TitlesMd from './titles/titles.md';
import TitlesImg from './titles/titles.jpg';

import AuthorsMd from './authors/authors.md';
import AuthorsImg from './authors/authors.jpg';

import ColophonsMd from './colophons/colophons.md';
import ColophonsImg from './colophons/colophons.jpg';

import CollectionsMd from './collections/collections.md';
import CollectionsImg from './collections/collections.jpg';

import './Intro.css';

export default function Intro(props){

  const tb = props.match.params.table;

  const dataMap = {
    places: {
      label: "Places",
      img: PlacesImg,
      data: [{
        title: false,
        mdPath: PlacesMd
      }]
    },
    manuscripts: {
      label: "Manuscripts",
      img: ManuscriptsImg,
      data: [{
        title: false,
        mdPath: ManuscriptsMd
      }]
    },
    works: {
      label: "Works",
      img: WorksImg,
      data: [{
        title: false,
        mdPath: WorksMd
      }, {
        title: "Literary works currently without a Clavis Coptica entry",
        mdPath: WorksWithoutClavisMd
      }]
    },
    titles: {
      label: "Titles",
      img: TitlesImg,
      data: [{
        title: false,
        mdPath: TitlesMd
      }]
    },
    authors: {
      label: "Authors",
      img: AuthorsImg,
      data: [{
        title: false,
        mdPath: AuthorsMd
      }]
    },
    colophons: {
      label: "Colophons",
      img: ColophonsImg,
      data: [{
        title: false,
        mdPath: ColophonsMd
      }]
    },
    collections: {
      label: "Collections",
      img: CollectionsImg,
      data: [{
        title: false,
        mdPath: CollectionsMd
      }]
    }
  };


  if (!dataMap.hasOwnProperty(tb)) {
    return (<div className="container m-5 p-5 text-center text-danger">
      Error: invalid table name
      <code>{ tb }</code>
    </div>);
  }

  const d = dataMap[tb];

  let styles = {};

  if(d.img){
    styles = {
      width: '100%',
      height: '300px',
      backgroundImage: 'url(' + d.img +')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%'
    };
  }

  return <div>
    <div style={ styles }></div>

    <SubHead tblabel={d.label} tb={tb} text="Introduction" />
    <div className="container">
      { d.data.map( (i, k) => {
        return (<div key={ k } className={`intro-level-${k} mt-5 border-top pt-5`}>
          { i.title && <h1>{ i.title }</h1> }
          <div className="my-3 px-md-5 double-column text-justify">
            <ReactMarkdownPath path={i.mdPath} />
          </div>
        </div>)
      } )}

    </div>
  </div>
}
