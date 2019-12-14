import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class ChampionIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairs: []
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { championName, hyperLink, imageLink } = this.props;
    return (
      <div style={{marginBottom: '15px', marginTop: '15px'}}>
        <Link to={ hyperLink }>
          <div className="champion-icon pl-3 pr-3">
              <img alt={ championName } src={ imageLink } />
          </div>
          <div className="champion-name overflow">
            <a href={ hyperLink }>
              { championName }
            </a>
          </div>
        </Link>
      </div>
    )
  }
}

export default ChampionIcon;