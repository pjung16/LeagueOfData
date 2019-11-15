import React, { Component } from 'react';

class ChampionIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      championName: 'Ahri',
      hyperLink: 'google.com',
      imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Ahri.png',
    };
  }

  render() {
    return (
      <div>
        <div className="champion-icon">
          <a href={ this.state.hyperLink }>
            <img alt={ this.state.championName } src={ this.state.imageLink } />
          </a>
        </div>
        <div className="champion-name" >
          <a href={ this.state.hyperLink }>
            { this.state.championName }
          </a>
        </div>
      </div>
    )
  }
}

export default ChampionIcon;