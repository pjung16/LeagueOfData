import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Navbar expand="lg" className="header-container navbar-dark">
          <Nav.Link>
            <Link to="/">
              <img className="logo" src="logo.png" alt="D" />
              <span className="heading mr-auto">League of Data</span>
            </Link>
          </Nav.Link>
          <Navbar.Toggle aria-controls="header-navbar" />
          <Navbar.Collapse id="header-navbar">
            <Nav.Link>
              <Link className="header-item mr-auto" to="/">Best Pairs</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="header-item mr-auto" to="/bestTeams">Best Teams</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="header-item mr-auto" to="/about">About</Link>
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    )
  }
}

// <Link to={ '/' } style={{textDecoration: 'none'}}>
//           <div className="headerContainer">
//             <h1 className="heading">League of Data</h1>
//           </div>
//         </Link>

export default Header;