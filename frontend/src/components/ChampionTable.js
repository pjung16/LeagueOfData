import React, { Component } from 'react';
import axios from 'axios';
import ChampionIcon from './ChampionIcon.js'
import 'bootstrap/dist/css/bootstrap.css';

class ChampionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: []
    };
    this.apiUrl = 'https://leagueofdata1.herokuapp.com';
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${this.apiUrl}/champions`);
      console.log(response.data)
      this.setState({ champions: response.data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { champions } = this.state;

    if (this.props.filterText !== '') {
      return (
        <div className="container">
          <div className="row justify-content-start">
            {champions.filter(champion => {
              return champion.name.toLowerCase().includes(this.props.filterText.toLowerCase())
            }).map((champion) => {
              const { name, hyperLink, imageLink, key } = champion;
              return(
                <div className="champion-select col-2">
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
    } else {
      return (
        <div className="container">
          <div className="row justify-content-start">
            {champions.map((champion) => {
              const { name, hyperLink, imageLink, key } = champion;
              return(
                <div className="champion-select col-2">
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
}

export default ChampionTable;