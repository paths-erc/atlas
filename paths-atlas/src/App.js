import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import fontawesome from '@fortawesome/fontawesome'
import {faEye, faBug, faLink, faExternalLinkSquareAlt, faIdBadge} from '@fortawesome/fontawesome-free-solid';

import MainTemplate from './components/mainLayout/template/mainTemplate';
import Home from './components/home/home'
import Atlas from './components/atlas/atlas'
import SearchResults from './components/searchResults/searchResults'
import SearchForm from './components/SearchForm/SearchForm'

import Places from './components/Places/Places'
import Titles from './components/titles/titles'
import Works from './components/works/works'
import Manuscripts from './components/manuscripts/manuscripts'
import Authors from './components/Authors/Authors'
import Colophons from './components/Colophons/Colophons'
import ViewOne from './components/Record/ViewOne'


fontawesome.library.add(faEye, faBug, faLink, faExternalLinkSquareAlt, faIdBadge);


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/atlas' component={Atlas}/>
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
