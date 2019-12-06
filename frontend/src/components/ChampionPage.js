import React, { Component } from 'react';
import PairTable from './PairTable';
import ChampionChart from'./ChampionChart';
import 'bootstrap/dist/css/bootstrap.css';

class ChampionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
  }

  render() {
    return (
      <div className="container" style={{maxWidth: '950px'}}>
        <ChampionChart />
        <PairTable url={this.props.location.search} />
      </div>
    )
  }
}

export default ChampionPage;