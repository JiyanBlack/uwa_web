import React from "react";
import Chart from "./Chart.js";

export default class Result extends React.Component {
  constructor() {
    super();
    this.data = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [
        {
          name: 'Jane',
          data: [1, 0, 4]
        }, {
          name: 'John',
          data: [5, 7, 3]
        }
      ]
    }
  }



  render() {

    return (
      <div className="container section">
        <Chart options={this.data} container={"chart0"} type={"Chart"} modules={[]} />
      </div>
    )

  }
}