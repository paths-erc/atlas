import React, { Component } from 'react';
import { NavLink, Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import { Link, NavLink as RRNavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FixedNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

render() {
    return (
          <div>
            <Navbar color="dark" dark expand="md" className="fixed-top">
              <NavbarBrand to="/" tag={Link}>PAThs</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink style={{ backgroundColor: '#cc545a', color: '#fff'}} to="/map/saved/all_ms_places" tag={RRNavLink}>
                      <FontAwesomeIcon icon="map" /> Atlas
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/places" tag={RRNavLink}>Places</NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink to="/manuscripts" tag={RRNavLink}>Manuscripts</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/works" tag={RRNavLink}>Works</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/authors" tag={RRNavLink}>Authors</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/titles" tag={RRNavLink}>Titles</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/colophons" tag={RRNavLink}>Colophons</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/collections" tag={RRNavLink}>Collections</NavLink>
                  </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="http://paths.uniroma1.it">
                      Website
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/cite" tag={RRNavLink}>
                      How to cite PAThs</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/api" tag={RRNavLink}>
                      API</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
    );
  }
}

export default FixedNavbar;
