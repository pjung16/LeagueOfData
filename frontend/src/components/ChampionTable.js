import React, { Component } from 'react';
import ChampionIcon from './ChampionIcon.js'
import 'bootstrap/dist/css/bootstrap.css';

class ChampionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: [
        {
          championName: 'Ahri',
          hyperLink: 'ahri',
          imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Ahri.png',
        },
        {
          championName: 'Bard',
          hyperLink: 'bard',
          imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Bard.png',
        },
        {
          championName: 'Renekton',
          hyperLink: 'renekton',
          imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Renekton.png',
        },
        {
          championName: 'Soraka',
          hyperLink: 'soraka',
          imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Soraka.png',
        },
        {
          championName: 'Talon',
          hyperLink: 'talon',
          imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Talon.png',
        },
        {
          championName: 'Urgot',
          hyperLink: 'urgot',
          imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Urgot.png',
        },
      ]
    };
  }

  render() {
    const { champions } = this.state;
    return (
      <div className="container">
        <div className="row">
          {champions.map((champion) => {
            const { championName, hyperLink, imageLink } = champion;
            return(
              <ChampionIcon
                key={championName}
                championName={championName}
                hyperLink={hyperLink}
                imageLink={imageLink}
              >
              </ChampionIcon>
            );
          })}
        </div>
      </div>
    )
  }
}

export default ChampionTable;