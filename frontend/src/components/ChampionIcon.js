import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class ChampionIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairs: []
    };
    this.apiUrl = 'http://127.0.0.1:5000';
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { championName, hyperLink, imageLink } = this.props;
    return (
      <div style={{marginBottom: '15px'}}>
        <Link to={ hyperLink }>
          <div className="champion-icon">
              <img alt={ championName } src={ imageLink } />
          </div>
          <div className="champion-name">
            <a href={ hyperLink } style={{textDecoration: 'none', color: 'white'}}>
              { championName }
            </a>
          </div>
        </Link>
      </div>
    )
  }
}

export default ChampionIcon;