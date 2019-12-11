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
      <div className="col-2" style={{marginBottom: '15px'}}>
        <Link to={ hyperLink }>
          <div className="champion-icon">
              <img alt={ championName } src={ imageLink } />
          </div>
          <div className="champion-name">
            <a href={ hyperLink } style={{textDecoration: 'none', color: 'white'}}>
              { championName }
            </a>
          </div>
        </Link>
      </div>
    )
  }
}

export default ChampionIcon;