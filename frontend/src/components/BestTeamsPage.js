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
        <Header />
        <h1>Best Teams</h1>
        <h3>{`${teams.length} teams have a win rate of ${(wins/(wins+losses)*100).toFixed(2)}% with ${wins} wins and ${losses} losses`}</h3>
        {teams.map((team) => {
          return (
            <TeamRow key={team} team={team} />
          )
        })}
      </div>
    )
  }
}

export default BestTeamsPage;