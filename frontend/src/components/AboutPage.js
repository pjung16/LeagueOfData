import React, { Component } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

class BestTeamsPage extends Component {
  
  render() {
    return (
      <div className="container" style={{maxWidth: '950px', color: '#ffffff'}}>
        <div className="about-header">
          <h1>ABOUT</h1>
        </div>
        <p>
          League of Data is data-driven web application that returns ideal champion pairings for the game <span style={{fontStyle: 'italic'}}>League of Legends</span>. The application uses Riot's very own API to collect match data from Challenger players.
        </p>
        <p>
          For a more technical and detailed understanding of the application, <a className="about-link" href="https://github.com/pjung16/LeagueOfData" target="blank">visit its GitHub repository.</a>
        </p>
        <br />
        <p className="mb-5">
          League of Data was developed by <a className="about-link" href="https://www.kennethslee.com/" target="blank">Kenneth Lee</a>, <a className="about-link" href="https://pjung16.github.io/" target="blank">Philip Jung</a>, and <a className="about-link" href="https://www.josephjd.kim/" target="blank">Joseph Kim</a>.
        </p>
        <img className="logo" src="logo.png" alt="D" />
      </div>
    )
  }
}

export default BestTeamsPage;