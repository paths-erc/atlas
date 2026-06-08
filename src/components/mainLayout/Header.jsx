import React, { useState } from 'react';

import { NavLink, Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function isEntityActive(pathname, entity) {
  return pathname === `/${entity}` ||
         pathname.startsWith(`/${entity}/`) ||
         pathname.startsWith(`/search/${entity}`);
}

export default function FixedNavbar() {

  const [isOpen, toggleOpen] = useState(false);
  const { pathname } = useLocation();

  return (
        <div>
          <Navbar color="dark" dark expand="md" className="fixed-top">
            <NavbarBrand to="/" tag={Link}>PAThs</NavbarBrand>
            <NavbarToggler onClick={()=>{ toggleOpen(!isOpen) }} />
            <Collapse isOpen={ isOpen } navbar>
              <Nav className="me-auto" navbar>
                <NavItem>
                  <NavLink style={{ backgroundColor: '#cc545a', color: '#fff'}} to="/map/saved/all_ms_places" tag={Link}>
                    <FontAwesomeIcon icon="map" /> Atlas
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/places" tag={Link} active={isEntityActive(pathname, 'places')}>Places</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/manuscripts" tag={Link} active={isEntityActive(pathname, 'manuscripts')}>Manuscripts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/works" tag={Link} active={isEntityActive(pathname, 'works')}>Works</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/authors" tag={Link} active={isEntityActive(pathname, 'authors')}>Authors</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/titles" tag={Link} active={isEntityActive(pathname, 'titles')}>Titles</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/colophons" tag={Link} active={isEntityActive(pathname, 'colophons')}>Colophons</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/persons" tag={Link} active={isEntityActive(pathname, 'persons')}>Persons</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/collections" tag={Link} active={isEntityActive(pathname, 'collections')}>Collections</NavLink>
                </NavItem>
              </Nav>

              <Nav navbar>
                <NavItem>
                  <NavLink href="http://paths.uniroma1.it">Website</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/cite" tag={Link} active={pathname === '/cite'}>How to cite PAThs</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/api" tag={Link} active={pathname === '/api'}>API</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
  );
}
