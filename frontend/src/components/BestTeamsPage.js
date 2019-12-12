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
      this.setState({ 
        teams: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { teams } = this.state;

    return (
      <div className="container" style={{maxWidth: '950px', color: '#ffffff'}}>
        <Header />
        <h1>Best Teams</h1>
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