import React, { Component } from 'react';
import ChampionTable from './ChampionTable'
import 'bootstrap/dist/css/bootstrap.css';
import SearchFilter from './SearchFilter';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };

    this.getText = this.getText.bind(this);
  }

  getText(text) {
    this.setState({
      filterText: text,
    })
  }

  render() {
    return (
      <div className="container">
        <h1 style={{color: '#ffffff', marginBottom: '50px',}}>League of Data</h1>
        <SearchFilter getText={this.getText}/>
        <ChampionTable filterText={this.state.filterText}/>
      </div>
    )
  }
}

export default Home;