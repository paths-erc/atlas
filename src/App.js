import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowCircleRight, faBug, faEye, faExternalLinkSquareAlt, faFilter, faIdBadge, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import MainTemplate from './components/mainLayout/MainTemplate';
import Home from './components/Home/Home';
import BrowserNotSupported from './components/Home/BrowserNotSupported';
import PathsMap from './components/PathsMap/PathsMap';

import SearchSaved from './components/Search/SearchSaved';
import SearchSimple from './components/Search/SearchSimple';
import SearchAdv from './components/Search/SearchAdv';
import SearchEncoded from './components/Search/SearchEncoded';
import SearchAll from './components/Search/SearchAll';

import Intro from './components/Intro/Intro';

import ViewOne from './components/Record/ViewOne';
import Charts from './components/Charts/Charts';
import Cite from './components/Cite/Cite';
import Api from './components/Api/Api';
import ReactGA from 'react-ga';
import { detect } from 'detect-browser';

const browser = detect();


if(window.location.href.match(/atlas\.paths-erc\.eu/g)){
  ReactGA.initialize('UA-10461068-45');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const compatibility = {
  'ie': 10000,
  'opera-mini': 10000,
  'bb10': 10000,
  'edge': 14,
  'firefox': 39,
  'chrome': 42, // 42
  'safari': 11,
  'opera': 29,
  'android': 67,
}

let notSupported = false;
if (browser){
  const bName = browser.name;
  const bVersion = browser.version.split('.')[0];

  if ( Object.keys(compatibility).indexOf(bName) > -1 && bVersion < compatibility[bName] ) {
    notSupported = true;
  }
}

library.add(fas, fab, faArrowCircleRight, faBug, faEye, faExternalLinkSquareAlt, faFilter, faGithub, faIdBadge, faLink, faMapMarkerAlt);


export default function App () {

    if (notSupported){
      return <BrowserNotSupported browser={browser} compatibility={compatibility} />
    }

    return (
      <BrowserRouter basename="/">
        <Switch>
          <Route path='/map/:action?/:data?' component={PathsMap}/>
          <MainTemplate>
            <Route exact path='/' component={ Home } />
            <Route exact path='/:table(places|titles|works|manuscripts|authors|colophons|persons|collections)' component={Intro} />
            <Route exact path='/:table(places|titles|works|manuscripts|authors|colophons|persons|collections)/:id' component={ViewOne} />

            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons|persons|collections)/saved' component={SearchSaved} />
            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons|persons|collections)/all' component={SearchAll} />
            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons|persons|collections)/adv' component={SearchAdv} />
            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons|persons|collections)/encoded' component={SearchEncoded} />
            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons|persons|collections)' component={SearchSimple} />

            <Route exact path='/charts/:id?' component={Charts} />
            <Route exact path='/cite' component={Cite} />
            <Route exact path='/api' component={Api} />

          </MainTemplate>
        </Switch>
      </BrowserRouter>
    );}
