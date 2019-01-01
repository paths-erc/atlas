/* jshint esversion: 6 */
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import SubHead from '../SubHead/SubHead';
import Loading from '../Loading/Loading';

import PlacesMd from './places/places.md';
import PlacesImg from './places/places.jpg';

import ManuscriptsMd from './manuscripts/manuscripts.md';
import ManuscriptsImg from './manuscripts/manuscripts.jpg';

import WorksMd from './works/works.md';
import WorksImg from './works/works.jpg';

import TitlesMd from './titles/titles.md';
import TitlesImg from './titles/titles.jpg';

import AuthorsMd from './authors/authors.md';
import AuthorsImg from './authors/authors.jpg';

import ColophonsMd from './colophons/colophons.md';
// import ColophonsImg from './colophons/colophons.jpg';

export default class PlacePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tb: props.match.params.table,
      label: false,
      text: false,
      img: false
    };
  }

  _updateData(tb){
    let md = false;
    let img = false;
    let label = false;

    switch (tb) {
      case 'places':
        md = PlacesMd;
        img = PlacesImg;
        label = 'Places';
        break;
      case 'manuscripts':
        md = ManuscriptsMd;
        img = ManuscriptsImg;
        label = 'Manuscripts';
        break;
      case 'works':
        md = WorksMd;
        img = WorksImg;
        label = 'Works';
        break;
      case 'titles':
        md = TitlesMd;
        img = TitlesImg;
        label = 'Titles';
        break;
      case 'authors':
        md = AuthorsMd;
        img = AuthorsImg;
        label = 'Authors';
        break;
      case 'colophons':
        md = ColophonsMd;
        // img = ColophonsImg;
        label = 'Colophons';
        break;
      default:
        return false;
    }

    fetch(md).then((response) => response.text()).then((text) => {
      this.setState({
        tb: tb,
        text: text,
        img: img,
        label: label
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.table !== prevProps.match.params.table) {
      this._updateData(this.props.match.params.table);
    }
  }

  componentDidMount() {
    this._updateData(this.state.tb);
  }


  render() {
    if(!this.state.text){
      return <Loading />
    }
    let styles;

    if(this.state.img){
      styles = {
        width: '100%',
        height: '300px',
        backgroundImage: 'url(' + this.state.img +')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%'
      };
    }

    return (
      <div>
        <div style={ styles }>

        </div>

        <SubHead tblabel={this.state.label} tb={this.state.tb} text="Introduction" />

        <div className="container">
          <div className="my-3 px-md-5 double-column text-justify">
            <ReactMarkdown source={this.state.text} escapeHtml={false} />
          </div>
        </div>
      </div>
    );
  }
}
