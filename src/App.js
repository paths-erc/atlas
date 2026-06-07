import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
import SearchAdv from './components/Search/SearchAdv';
import SearchShortSQL from './components/Search/SearchShortSQL';
import SearchAll from './components/Search/SearchAll';

import Intro from './components/Intro/Intro';

import ViewOne from './components/Record/ViewOne';
import Cite from './components/Cite/Cite';
import Api from './components/Api/Api';
import { detect } from 'detect-browser';

const browser = detect();


const compatibility = {
  'ie': 10000,
  'opera-mini': 10000,
  'bb10': 10000,
  'edge': 14,
  'firefox': 39,
  'chrome': 42,
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
        <Routes>
          {/* Map — full-screen, no main layout shell */}
          <Route path='/map/:action?/:data?' element={<PathsMap />}/>

          {/* All other pages share the MainTemplate layout (Header + Footer) */}
          <Route element={<MainTemplate />}>
            <Route index element={<Home />} />

            {/* Table intro pages: /places, /manuscripts, … */}
            <Route path='/:table' element={<Intro />} />

            {/* Single record view: /places/1234 */}
            <Route path='/:table/:id' element={<ViewOne />} />

            {/* Search routes — more-specific paths before the generic one */}
            <Route path='/search/:table/saved'    element={<SearchSaved />} />
            <Route path='/search/:table/all'      element={<SearchAll />} />
            <Route path='/search/:table/shortsql' element={<SearchShortSQL />} />
            <Route path='/search/:table'          element={<SearchAdv />} />

            <Route path='/cite' element={<Cite />} />
            <Route path='/api'  element={<Api />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
