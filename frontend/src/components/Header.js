import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Link to={ '/' } style={{textDecoration: 'none'}}>
          <div className="headerContainer">
            <img src="logo.png" className="logo"/>
            <h1 className="heading">League of Data</h1>
          </div>
        </Link>
      </Fragment>
    )
  }
}

export default Header;