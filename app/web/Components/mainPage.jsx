'use strict';

import React from 'react';
import Header from './Header';
import Description from './Description';
import Error from './Error';
import Form from './Form';
import Result from './Result';

export default class mainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        urls: [],
        text: '',
        checked: []
      },
      Highchartmodules: [],
      result: null, // require('../sampleresult.js'),
      buttonState: {
        submitting: false,
        alreadyGetResult: false
      },
      error: undefined
    };
  }

  changeInputs(inputs) {
    this.state.inputs = inputs;
    console.log(inputs);
    this.setState({
      error: undefined
    });
    $.ajax({
      url: '/',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(inputs)
    })
      .fail((jq, status, error) => console.log('Ajax Error: ' + error.toString()))
      .done((data, status, jq) => {
        this.setState({
          result: JSON.parse(data)
        });
      });
  }

  setButtonState(submitting, alreadyGetResult) {
    this.setState({
      buttonState: {
        submitting,
        alreadyGetResult
      }
    });
  }

  renderResult() {
    let results = [];
    for (let i in this.state.result) {
      results.push(<Result key={'Result' + i} name={'RESULT ' + Number(i + 1)} setButtonState={this.setButtonState.bind(this)} result={this.state.result[i]} modules={this.state.Highchartmodules}/>
      );
    }
    return results;
  }

  displayError(error) {
    window.scrollTo(0, 0);
    this.setState({
      error
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <Description/>
        <Error message={this.state.error}/>
        <Form displayError={this.displayError.bind(this)}  changeInputs={this
        .changeInputs
        .bind(this)} setButtonState={this.setButtonState.bind(this)} buttonState={this.state.buttonState} />
        {this.renderResult()}
      </div>
      );
  }
}
