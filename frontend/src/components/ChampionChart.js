import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ChampionChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    }
  }

  render() {
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={this.props.options} />
      </div>
    )
  }
}

export default ChampionChart