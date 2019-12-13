import React, { Component } from 'react';
import ChampionInfo from './ChampionInfo.js'
import 'bootstrap/dist/css/bootstrap.css';

class PairTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairs: []
    };
    this.apiUrl = 'https://leagueofdata1.herokuapp.com';
  }

  render() {
    const { pairs } = this.props;
    return (
      <div className="container" style={{marginTop: '25px'}}>
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