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
  }

  async componentDidMount() {
    try {
      console.log(this.props);
      const champId = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).champId;
      const response = await axios.get(`${this.apiUrl}/pairs`, {
        params: {
          champId: champId
        }
      });
      const pairs = this.removeItself(response.data, champId);
      const champions = this.getChampions(pairs);
      const wins = this.getWins(pairs);
      const losses = this.getLosses(pairs);
      const champInfo = await axios.get(`${this.apiUrl}/championData`, {
        params: {
          champId: champId
        }
      });
      this.setState({ 
        pairs: pairs,
        champions: champions,
        wins: wins,
        losses: losses,
        champInfo: champInfo.data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  removeItself(pairs, champId) {
    const champIds = pairs.map((champion) => champion[2]);
    pairs.splice(champIds.indexOf(parseInt(champId)), 1);
    return pairs;
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

  render() {
    const options = {
      chart: {
        type: 'column',
        backgroundColor: 'rgb(25,34,39)',
        borderColor: '#ffffff',
        borderWidth: 1
      },
      title: {
        text: 'Champion Pair Wins & Losses',
        style: {
          color: "#ffffff"
        }
      },
      xAxis: {
        categories: this.state.champions,
        labels: {
          style: {
            color: "#ffffff"
          }
        },
        title: {
          text: 'Champions',
          style: {
            color: "#ffffff"
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Games',
          style: {
            color: "#ffffff"
          }
        },
        labels: {
          style: {
            color: "#ffffff"
          }
        },
      },
      legend: {
        itemStyle: {
          color: '#ffffff',
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
        data: this.state.wins,
        color: '#38bfc0'
      }, {
        name: 'Losses',
        data: this.state.losses,
        color: '#fd5d5f'
      }]
    };
    const { pairs } = this.state;
    const { name, hyperLink, imageLink, wins, losses, pickRate } = this.state.champInfo;
    return (
      <div className="container" style={{maxWidth: '950px', color: '#ffffff'}}>
        <Logo />
        <ChampionIcon
          championName={name}
          hyperLink={hyperLink}
          imageLink={imageLink}
        />
        <div style={{marginBottom: '25px'}}>{`Wins: ${wins} Losses: ${losses} Win Rate: ${(wins/(wins+losses)*100).toFixed(2)}% Pick Rate: ${(pickRate*100).toFixed(2)}%`}</div>
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