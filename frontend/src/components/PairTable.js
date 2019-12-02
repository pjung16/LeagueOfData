import React, { Component } from 'react';
import axios from 'axios';
import ChampionIcon from './ChampionIcon.js'
import 'bootstrap/dist/css/bootstrap.css';
import qs from 'query-string';

class PairTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: []
    };
    this.apiUrl = 'http://127.0.0.1:5000';
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${this.apiUrl}/pairs`, {
        params: {
          champId: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).champId
        }
      });
      console.log(response.data)
      this.setState({ champions: response.data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { champions } = this.state;
    return (
      <div className="container">
        {/* <div className="row justify-content-start"> */}
          {champions.map((champion) => {
            return(
              <p
                key={champion[2]}
              >
                  <div>{champion[2]}</div>
                  <div>{`${champion[0]*100}% winrate in ${champion[1]} games`}</div>
              </p>
            );
          })}
        {/* </div> */}
      </div>
    )
  }
}

export default PairTable;