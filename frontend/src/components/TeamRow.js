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
    this.apiUrl = 'https://3.95.169.184:5000';
  }

  async componentDidMount() {
    try {
      const champions = [];
      let champInfo;
      for(let i = 0; i < this.props.team.length; i++) {
        champInfo = await axios.get(`${this.apiUrl}/championData`, {
          params: {
            champId: this.props.team[i]
          }
        });
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
        <div className="row justify-content-center">
          {champions.map((champion) => {
            const { name, hyperLink, imageLink, key } = champion;
            return(
              <div className="col-md-2">
                <ChampionIcon
                  key={key}
                  championName={name}
                  hyperLink={hyperLink}
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