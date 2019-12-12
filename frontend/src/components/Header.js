import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

class Header extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg header-container" style={{marginBottom: '50px'}}>
          <Link to="/">
            <img className="logo" src="logo.png" alt="D" />
            <span className="heading">League of Data</span>
          </Link>
          <div class="collapse navbar-collapse" id="header-navbar">
            <ul class="navbar-nav">
              <li class="header-item">
                <Link class="nav-link" to="/">Best Pairs</Link>
              </li>
              <li class="header-item">
                <Link class="nav-link" to="/bestTeams">Best Teams</Link>
              </li>
              <li class="header-item">
                <Link class="nav-link" to="/aboutUs">About Us</Link>
              </li>
            </ul>
          </div>
        </nav>
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