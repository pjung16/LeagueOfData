import React, { Component } from 'react';
import ChampionTable from './ChampionTable'
import Logo from './Logo'
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
    const { history } = this.props;
    return (
      <div className="container" style={{maxWidth: '950px'}}>
        <Logo />
        <SearchFilter getText={this.getText}/>
        <ChampionTable history={history} filterText={this.state.filterText}/>
      </div>
    )
  }
}

export default Home;