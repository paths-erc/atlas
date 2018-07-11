import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import fontawesome from '@fortawesome/fontawesome'
import {faArrowCircleRight, faBug, faEye, faExternalLinkSquareAlt, faFilter, faIdBadge, faLink, faMapMarkerAlt} from '@fortawesome/fontawesome-free-solid';

import MainTemplate from './components/mainLayout/MainTemplate';
import Home from './components/Home/Home'
import PathsMap from './components/PathsMap/PathsMap'
import SearchResults from './components/SearchResults/SearchResults'
import SearchForm from './components/SearchForm/SearchForm'

import Places from './components/Places/Places'
import Titles from './components/titles/titles'
import Works from './components/works/works'
import Manuscripts from './components/manuscripts/manuscripts'
import Authors from './components/Authors/Authors'
import Colophons from './components/Colophons/Colophons'
import ViewOne from './components/Record/ViewOne'


fontawesome.library.add(faArrowCircleRight, faBug, faEye, faExternalLinkSquareAlt, faFilter, faIdBadge, faLink, faMapMarkerAlt);


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="atlas">
        <Switch>
          <Route path='/map/:action?/:data?' component={PathsMap}/>
          <MainTemplate>
            <Route exact path='/' component={Home} />
            <Route path='/places' component={Places} />
            <Route path='/titles' component={Titles} />
            <Route path='/works' component={Works} />
            <Route path='/manuscripts' component={Manuscripts} />
            <Route path='/authors' component={Authors} />
            <Route path='/colophons' component={Colophons} />

            <Route exact path='/results/:table/:type' component={SearchResults} />
            <Route exact path='/search/:table/' component={SearchForm} />
            <Route exact path='/read/:table/:id' component={ViewOne} />

          </MainTemplate>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
