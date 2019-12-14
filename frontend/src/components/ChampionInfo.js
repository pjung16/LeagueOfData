import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';


class ChampionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: []
    };
    this.apiUrl = 'https://leagueofdata1.herokuapp.com';

    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${this.apiUrl}/champion`, {
        params: {
          champId: this.props.champId
        }
      });
      this.setState({ champion: response.data });
    } catch (e) {
      console.log(e);
    }
  }

  onClick() {
    console.log(this.state.champion)
    this.props.history.push({
      pathname: '/pairs',
      search: `?champId=${this.props.champId}`
    });
    window.location.reload(false);
  }

  render() {
    const { data } = this.props;
    const { name, hyperLink, imageLink } = this.state.champion;
    return (
      <div className="champion-info" onClick={this.onClick}>
        <div className="champion-icon">
          <a className="champion-icon pl-3 pr-3" href={ hyperLink }>
            <img alt={ name } src={ imageLink } />
          </a>
        </div>
        <div className="champion-name">
          <a href={ hyperLink }>
            { name }
          </a>
        </div>
        <div><span className="winrate">{`${(data[0]*100).toFixed(2)}%`}</span> winrate</div>
        <div>in {`${data[1]} games`}</div>
      </div>

    )
  }
}

export default withRouter(ChampionInfo);