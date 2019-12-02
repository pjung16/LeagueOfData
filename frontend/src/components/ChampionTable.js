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
    this.apiUrl = 'http://127.0.0.1:5000';
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
    return (
      <div className="container">
        <div className="row justify-content-start">
          {champions.map((champion) => {
            const { name, hyperLink, imageLink, key } = champion;
            return(
              <ChampionIcon
                key={key}
                championName={name}
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