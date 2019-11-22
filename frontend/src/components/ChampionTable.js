import React, { Component } from 'react';
import ChampionIcon from './components/ChampionIcon.js'

class ChampionTable extends Component {
  constructor(props) {
    super(props);
    console.log('hi');
    this.state = {
      champions: [
        {
          championName: 'Ahri',
          hyperLink: 'ahri',
          imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Ahri.png',
          championName: 'Bard',
          hyperLink: 'bard',
          imageLink: 'https://ddragon.leagueoflegends.com/cdn/9.22.1/img/champion/Bard.png',
        }
      ]
    };
  }

  render() {
    const { champions } = this.state;
    return (
      <div>
        console.log(champions);
        {champions.forEach((champion) => {
          const { championName, hyperLink, imageLink } = champion;
          console.log(champion);
          return(
            <ChampionIcon
              championName={championName}
              hyperLink={hyperLink}
              imageLink={imageLink}
            />
          );
        })}
      </div>
    )
  }
}

export default ChampionTable;