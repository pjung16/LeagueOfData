import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


class ChampionInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: []
    };
    this.apiUrl = 'http://127.0.0.1:5000';
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

  render() {
    const { data } = this.props;
    const { name, hyperLink, imageLink } = this.state.champion;
    return (
      <div className="col-3" style={{marginBottom: '15px', color: 'white'}}>
        <div className="champion-icon">
          <a href={ hyperLink }>
            <img alt={ name } src={ imageLink } />
          </a>
        </div>
        <div className="champion-name">
          <a href={ hyperLink }>
            { name }
          </a>
        </div>
        <div>{`${(data[0]*100).toFixed(2)}% winrate in ${data[1]} games`}</div>
      </div>

    )
  }
}

export default ChampionInfo;