import React, { Component } from 'react';
import axios from 'axios';
import qs from 'query-string';
import PairTable from './PairTable';
import ChampionChart from './ChampionChart';
import Logo from './Logo';
import ChampionIcon from './ChampionIcon';
import 'bootstrap/dist/css/bootstrap.css';

class ChampionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairs: [],
      champions: [],
      wins: [],
      losses: [],
      champInfo: {},
    };
    this.apiUrl = 'http://127.0.0.1:5000';

    this.getChampions = this.getChampions.bind(this);
    this.getWins = this.getWins.bind(this);
    this.getLosses = this.getLosses.bind(this);
    this.clicked = this.clicked.bind(this);
  }

  async componentDidMount() {
    try {
      console.log(this.props);
      const response = await axios.get(`${this.apiUrl}/pairs`, {
        params: {
          champId: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).champId
        }
      });
      const champions = this.getChampions(response.data);
      const wins = this.getWins(response.data);
      const losses = this.getLosses(response.data);
      const champInfo = await axios.get(`${this.apiUrl}/champion`, {
        params: {
          champId: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).champId
        }
      });
      this.setState({ 
        pairs: response.data,
        champions: champions,
        wins: wins,
        losses: losses,
        champInfo: champInfo.data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  getChampions(res) {
    const champions = res.reduce((total, val) => {
      total.push(val[5])
      return total
    }, []);
    return champions;
  }

  getWins(res) {
    const wins = res.reduce((total, val) => {
      total.push(val[3])
      return total
    }, []);
    return wins;
  }

  getLosses(res) {
    const losses = res.reduce((total, val) => {
      total.push(val[4])
      return total
    }, []);
    return losses;
  }

  clicked(link) {
    this.props.history.push(link);
  }

  render() {
    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Champion Pair Wins & Losses'
      },
      xAxis: {
        categories: this.state.champions
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Games'
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      plotOptions: {
        column: {
          stacking: 'num'
        }
      },
      series: [{
        name: 'Wins',
        data: this.state.wins
      }, {
        name: 'Losses',
        data: this.state.losses
      }]
    };
    const { pairs } = this.state;
    const { name, hyperLink, imageLink } = this.state.champInfo;
    return (
      <div className="container" style={{maxWidth: '950px'}}>
        <Logo />
        <ChampionIcon
          clicked={this.clicked}
          championName={name}
          hyperLink={hyperLink}
          imageLink={imageLink}
        />
        <ChampionChart 
          options={options}
        />
        <PairTable 
          url={this.props.location.search}
          pairs={pairs}
        />
      </div>
    )
  }
}

export default ChampionPage;