import React, { Component } from 'react';
import { Jumbotron, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SavedQueriesList from './SavedQueriesList';
import SavedQueries from '../Services/SavedQueries';


class SubHead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSaved: false
    };
  }

  toggleSaved(){
    this.setState({
      showSaved: !this.state.showSaved
    });
  }

  render(){
    const tblabel = this.props.tblabel;
    const tb = this.props.tb;
    const text = this.props.text ? <span className="subText">{this.props.text}</span> : false;

    let menuItems = [
      {
        to: '/results/' + tb + '/all',
        icon: 'list-ul',
        text: 'Show all'
      },
      {
        to: '/search/' + tb ,
        icon: 'search',
        text: 'Search'
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
                        <FontAwesomeIcon icon={e.icon} /> {e.text}
                      </NavLink>
                    </NavItem>
                  );
                })
              }
              { SavedQueries[tb] && (<NavItem><NavLink onClick={this.toggleSaved.bind(this)} to="#" tag={Link}><FontAwesomeIcon icon="save" /> Saved queries</NavLink></NavItem>)}
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
