import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowCircleRight, faBug, faEye, faExternalLinkSquareAlt, faFilter, faIdBadge, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import MainTemplate from './components/mainLayout/MainTemplate';
import Home from './components/Home/Home';
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


library.add(fas, fab, faArrowCircleRight, faBug, faEye, faExternalLinkSquareAlt, faFilter, faGithub, faIdBadge, faLink, faMapMarkerAlt);


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="atlas">
        <Switch>
          <Route path='/map/:action?/:data?' component={PathsMap}/>
          <MainTemplate>
            <Route exact path='/' component={Home} />
            <Route exact path='/:table(places|titles|works|manuscripts|authors|colophons)' component={Intro} />
            <Route exact path='/:table(places|titles|works|manuscripts|authors|colophons)/:id' component={ViewOne} />

            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons)/saved' component={SearchSaved} />
            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons)/all' component={SearchAll} />
            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons)/adv' component={SearchAdv} />
            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons)/encoded' component={SearchEncoded} />
            <Route exact path='/search/:table(places|titles|works|manuscripts|authors|colophons)' component={SearchSimple} />

            <Route exact path='/charts/:id?' component={Charts} />
            <Route exact path='/cite' component={Cite} />

          </MainTemplate>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
