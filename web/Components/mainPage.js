import React from "react";
import Header from "./Header";
import Description from "./Description";
import Form from "./Form";
import Result from "./Result";

export default class mainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        urls: [],
        text: "",
        checked: []
      },
      Highchartmodules: [],
      result: {
        charts:[]  
      }
    };
  }

  changeInputs(inputs) {
    this.state.inputs = inputs;
    console.log(inputs);
  }

  createChartDiv() {
    let resultDOM = [];
    for (let i in this.state.charts) {
      resultDOM.push(<Chart
        data-chart={this.data}
        data-modules={this.modules}
        container={"chart" + i} />);
    }
    return resultDOM;
  }

  render() {
    return (
      <div>
        <Header />
        <Description />
        <Form changeInputs={this.changeInputs.bind(this)} />
        <Result result={this.state.result} modules={this.state.modules} />
      </div>
    );
  }
}
