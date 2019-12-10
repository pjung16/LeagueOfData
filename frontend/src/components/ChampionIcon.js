import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './styles.css';

class ChampionIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairs: []
    };
    this.apiUrl = 'http://127.0.0.1:5000';

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }
  onClick() {
    this.props.clicked(this.props.hyperLink)
  }

  render() {
    const { championName, hyperLink, imageLink } = this.props;
    return (
      <div className="col-2" style={{marginBottom: '15px'}}>
        <div className="champion-icon" onClick={this.onClick}>
            <img alt={ championName } src={ imageLink } />
        </div>
        <div className="champion-name">
          <a href={ hyperLink } style={{textDecoration: 'none', color: 'white'}}>
            { championName }
          </a>
        </div>
      </div>
    )
  }
}

export default ChampionIcon;