import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, Navbar } from 'reactstrap';


import './MainMenu.scss';

class MainMenu extends Component {
  render() {
    return (
      <div className="main-menu">
        <Navbar color="faded" light>
          <Nav className="nav">
            <NavItem>
              <NavLink className="nav-link" to="/">
                Reservations
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default MainMenu;