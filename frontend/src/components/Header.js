import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

class Header extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg header-container">
          <a className="" href="#">
            <img className="logo" src="logo.png" alt="D" />
            <span className="heading">League of Data</span>
          </a>
          <div class="collapse navbar-collapse" id="header-navbar">
            <ul class="navbar-nav">
              <li class="header-item">
                <a class="nav-link" href="#">Best Pairs</a>
              </li>
              <li class="header-item">
                <a class="nav-link" href="#">Best Teams</a>
              </li>
              <li class="header-item">
                <a class="nav-link" href="#">About Us</a>
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