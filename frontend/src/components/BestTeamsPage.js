import React, { Component } from 'react';
import axios from 'axios';
import TeamRow from './TeamRow';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

class BestTeamsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };
    this.apiUrl = 'https://leagueofdata1.herokuapp.com';
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
        <div className="best-teams-header">
          <h2>Best Teams</h2>
          <div className="best-teams-stats">
            <div>Teams: {teams.length}</div>
            <div>Wins: <span className="win">{`${wins}`}</span> | Losses: <span className="loss">{`${losses}`}</span></div>
            <div>Win Rate: <span className="winrate">{`${(wins/(wins+losses)*100).toFixed(2)}%`}</span></div>
          </div>
        </div>
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