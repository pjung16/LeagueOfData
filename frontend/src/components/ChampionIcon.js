import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChampionIcon extends Component {
  render() {
    const { championName, hyperLink, imageLink } = this.props;
    return (
      <div className="col-2">
        <Link to={ hyperLink }>
          <div className="champion-icon">
              <img alt={ championName } src={ imageLink } />
          </div>
          <div className="champion-name">
            <a href={ hyperLink }>
              { championName }
            </a>
          </div>
        </Link>
      </div>
    )
  }
}

export default ChampionIcon;