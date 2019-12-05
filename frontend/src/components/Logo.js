import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Logo extends Component {
  render() {
    return (
      <Fragment>
        <Link to={ '/' } style={{textDecoration: 'none'}}>
          <div style={{marginBottom: '15px'}}>
            <img src="logo.png" style={{width: '100px'}}/>
            <h1 className="header">League of Data</h1>
          </div>
        </Link>
      </Fragment>
    )
  }
}

export default Logo;