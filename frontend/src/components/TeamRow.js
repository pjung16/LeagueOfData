import React, { Component } from 'react';
import axios from 'axios';
import ChampionIcon from './ChampionIcon.js'
import 'bootstrap/dist/css/bootstrap.css';

class TeamRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: []
    };
    this.apiUrl = 'http://leagueofdata1.herokuapp.com';
  }

  async componentDidMount() {
    try {
      const champions = [];
      let champInfo;
      for(let i = 0; i < this.props.team.length; i++) {
        champInfo = await axios.get(`${this.apiUrl}/champion`, {
          params: {
            champId: this.props.team[i]
          }
        });
        console.log(champInfo)
        champions.push(champInfo.data);
      }
      console.log(champions)
      this.setState({ champions: champions });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { champions } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center best-team">
          {champions.map((champion, i) => {
            const { name, hyperlink, imageLink, key } = champion;
            return(
              <div className="champion-select col-md-2">
                <ChampionIcon
                  key={key}
                  championName={name}
                  hyperLink={hyperlink}
                  imageLink={imageLink}
                >
                </ChampionIcon>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

export default TeamRow;