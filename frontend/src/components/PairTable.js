import React, { Component } from 'react';
import axios from 'axios';
import ChampionInfo from './ChampionInfo.js'
import 'bootstrap/dist/css/bootstrap.css';
import qs from 'query-string';

class PairTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairs: []
    };
    this.apiUrl = 'http://127.0.0.1:5000';
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${this.apiUrl}/pairs`, {
        params: {
          champId: qs.parse(this.props.url, { ignoreQueryPrefix: true }).champId
        }
      });
      this.setState({ pairs: response.data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { pairs } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-start">
          {pairs.map((pair) => {
            return(
              <ChampionInfo key={pair[2]} champId={pair[2]} data={pair} />
            );
          })}
        </div>
      </div>
    )
  }
}

export default PairTable;