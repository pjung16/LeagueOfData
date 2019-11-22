import React, { Component } from 'react';

class ChampionIcon extends Component {
  render() {
    const { championName, hyperLink, imageLink } = this.props;
    console.log(this.props);
    return (
      <div>
        <div className="champion-icon">
          <a href={ hyperLink }>
            <img alt={ championName } src={ imageLink } />
          </a>
        </div>
        <div className="champion-name" >
          <a href={ hyperLink }>
            { championName }
          </a>
        </div>
      </div>
    )
  }
}

export default ChampionIcon;