import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header";
import Description from "./Components/Description";
import Form from "./Components/Form";
import Result from "./Components/Result";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs:{
        urls:"",
        text:"",
        checked:""
      },
      modules:"",
      charts: [1]
    };
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
      series: [{
        name: 'Jane',
        data: [1, 0, 4]
      }, {
          name: 'John',
          data: [5, 7, 3]
        }],
    }
  }

  createChartDiv() {
    let resultDOM = [];
    for (let i in this.state.charts) {
      resultDOM.push(
        <Chart data-chart={this.data} data-modules={this.modules} container={"chart"+i}/>
      );
    }
    return resultDOM;
  }

  render() {
    return (
      <div>
        <Header />
        <Description />
        <Form />
        {this.createChartDiv()}
      </div>
    );
  }
}

const app_node = document.getElementById('app');

ReactDOM.render(
  <App/>, app_node
);