import React, { Component } from 'react';
import PairTable from './PairTable'
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
        <PairTable url={this.props.location.search} />
      </div>
    )
  }
}

export default ChampionPage;