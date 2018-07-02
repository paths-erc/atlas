import React, { Component } from 'react';

import { Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, DropdownMenu, DropdownToggle, DropdownItem, Collapse, NavLink, UncontrolledDropdown } from 'reactstrap';

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
              <NavbarBrand href="/">PAThs Atlas</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink href="/atlas">Atlas</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/places">Places</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/manuscripts">Manuscripts</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/works">Works</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/authors">Authors</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/titles">Titles</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/colophons">Colophons</NavLink>
                  </NavItem>


                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Pelagios LOD
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="/lod/void">VoiD</DropdownItem>
                      <DropdownItem href="https://db.bradypus.net/api/paths/places?verb=search&type=encoded&q_encoded=MSBMSU1JVCAwLCA1MDA=&fullRecords=true&format=turtle">
                          Places
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
    );
  }
}

export default FixedNavbar;
