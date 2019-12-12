import React, { Component } from 'react';
import axios from 'axios';
import TeamRow from './TeamRow';
import Header from './Header';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

class BestTeamsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };
    this.apiUrl = 'https://3.95.169.184:5000';
  }

  async componentDidMount() {
    try {
      console.log(this.props);
      const response = await axios.get(`${this.apiUrl}/bestTeams`);
      const { teams, wins, losses } = response.data;
      this.setState({ 
        teams: teams,
        wins: wins,
        losses: losses,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { teams, wins, losses } = this.state;

    return (
      <div className="container" style={{maxWidth: '950px', color: '#ffffff'}}>
        <div className="about-header">
          <h1>About</h1>
        </div>
        <p>
          League of Data is data-driven web application that returns ideal champion pairings for the game League of Legends. The application uses Riot's very own API to collect match data from Challenger players.
        </p>
        <p>
          For a more technical and detailed understanding of the application, <a className="about-link" href="https://github.com/pjung16/LeagueOfData" target="blank">visit its GitHub repository.</a>
        </p>
        <br />
        <p>
          League of Data was developed by <a className="about-link" href="https://www.kennethslee.com/" target="blank">Kenneth Lee</a>, <a className="about-link" href="https://pjung16.github.io/" target="blank">Philip Jung</a>, and <a className="about-link" href="https://www.josephjd.kim/" target="blank">Joseph Kim</a>.
        </p>
      </div>
    )
  }
}

export default BestTeamsPage;