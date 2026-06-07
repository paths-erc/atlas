import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowCircleRight, faBug, faEye, faExternalLinkSquareAlt, faFilter, faIdBadge, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Eager — part of the app shell, always needed immediately
import MainTemplate from './components/mainLayout/MainTemplate';
import BrowserNotSupported from './components/Home/BrowserNotSupported';
import Loading from './components/Loading/Loading';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import { detect } from 'detect-browser';

// Lazy — each route is a separate chunk loaded on demand
const Home          = lazy(() => import('./components/Home/Home'));
const PathsMap      = lazy(() => import('./components/PathsMap/PathsMap'));
const Intro         = lazy(() => import('./components/Intro/Intro'));
const ViewOne       = lazy(() => import('./components/Record/ViewOne'));
const SearchSaved   = lazy(() => import('./components/Search/SearchSaved'));
const SearchAdv     = lazy(() => import('./components/Search/SearchAdv'));
const SearchShortSQL= lazy(() => import('./components/Search/SearchShortSQL'));
const SearchAll     = lazy(() => import('./components/Search/SearchAll'));
const Cite          = lazy(() => import('./components/Cite/Cite'));
const Api           = lazy(() => import('./components/Api/Api'));

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
};

let notSupported = false;
if (browser) {
  const bName = browser.name;
  const bVersion = browser.version.split('.')[0];
  if (Object.keys(compatibility).indexOf(bName) > -1 && bVersion < compatibility[bName]) {
    notSupported = true;
  }
}

library.add(fas, fab, faArrowCircleRight, faBug, faEye, faExternalLinkSquareAlt, faFilter, faGithub, faIdBadge, faLink, faMapMarkerAlt);

const fallback = (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
    <Loading />
  </div>
);

export default function App() {

  if (notSupported) {
    return <BrowserNotSupported browser={browser} compatibility={compatibility} />;
  }

  return (
    <BrowserRouter basename="/">
      <ErrorBoundary>
      <Suspense fallback={fallback}>
        <Routes>
          {/* Map — full-screen, no main layout shell */}
          <Route path='/map/:action?/:data?' element={<PathsMap />} />

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
      </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
