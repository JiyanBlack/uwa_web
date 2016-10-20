'use strict';

import React from 'react';
import Highcharts from 'highcharts';

export default class Chart extends React.Component {

  componentDidMount() {
    if (this.props.modules.length != 0) {
      this.props.modules.forEach(moduleName => {
        require('highcharts/modules/' + moduleName)(Highcharts);
      });
    }
    this.chart = new Highcharts[this.props.type](this.props.container, this.props.options);
  }

  componentWillUnmount() {
    this
      .chart
      .destroy();
  }

  render() {
    return (<div id={this.props.container} style={this.props.style} />);
  }
}
