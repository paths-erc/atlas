import React, { Component } from 'react';
import { Jumbotron, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SavedQueriesList from './SavedQueriesList';
import SavedQueries from '../Services/SavedQueries';
import Cfg from '../Services/Cfg/Cfg';


class SubHead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSaved: false
    };
  }

  toggleSaved(e){
    this.setState({
      showSaved: !this.state.showSaved
    });
  }

  render(){
    const tblabel = this.props.tblabel ? this.props.tblabel : Cfg.label[this.props.tb];
    const tb = this.props.tb;
    const text = this.props.text ? <span className="subText">{this.props.text}</span> : false;

    let menuItems = [
      {
        to: '/search/' + tb + '/all',
        icon: 'list-ul',
        text: 'Show all'
      },
      {
        to: '/search/' + tb ,
        icon: 'search',
        text: 'Search'
      },
      {
        to: '/search/' + tb + '/adv',
        icon: 'search-plus',
        text: 'Advanced search'
      }
    ];

    return (
      <div>
        <Jumbotron className="p-4">

        <div className="container">
          <h2>{text}</h2>
          <Navbar color="light" light expand="xs" className="ml-auto">
            <NavbarBrand>
              <h3><small>{ tblabel }</small></h3>
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              {
                menuItems.map( (e, k) => {
                  return (
                    <NavItem key={k}>
                      <NavLink to={e.to} tag={Link}>
                        <FontAwesomeIcon icon={e.icon} /> <span className="d-none d-md-inline">{e.text}</span>
                      </NavLink>
                    </NavItem>
                  );
                })
              }
              { SavedQueries[tb] && (<NavItem><NavLink onClick={this.toggleSaved.bind(this)} style={{cursor: 'pointer'}}><FontAwesomeIcon icon="save" /><span className="d-none d-md-inline"> Saved queries</span></NavLink></NavItem>)}
            </Nav>
          </Navbar>

          {this.state.showSaved && <SavedQueriesList  tb={tb} tblabel={tblabel} closeFn={this.toggleSaved.bind(this)}/>}
        </div>
      </Jumbotron>
      </div>
    );
  }
}

export default SubHead;
