import React from "react";
import Chart from "./Chart.js";
// import Microformats from "./charts/Microformats";

export default class Result extends React.Component {
  constructor() {
    super();
    this.chartStyle = {
      default: {
        width: "100%",
        height: '400px'
      }
    }

    this.renderMap = {
      microformats: this
        .renderMicroformats
        .bind(this),
      languageAnalysis: this
        .renderLanguageAnalysis
        .bind(this),
      textExtraction: this
        .renderTextExtraction
        .bind(this),
      title: this
        .renderTitle
        .bind(this),
      publicationDate: this
        .renderPublicationDate
        .bind(this),
      authors: this
        .renderAuthors
        .bind(this),
      docSentiment: this
        .renderDocSentiment
        .bind(this),
      feeds: this
        .renderFeeds
        .bind(this),
      concepts: this
        .renderConcepts
        .bind(this),
      entities: this
        .renderEntities
        .bind(this)
    }

    this.counter = 0;
  }
  returnStringOrEmpty(object) {
    if (object == undefined || object.length == 0 || Object.keys(object).length == 0) {
      return "Empty";
    } else {
      return object.toString();
    }
  }

  renderResult() {
    let renderedCharts = [];
    for (let item in this.renderMap) {
      if (this.props.result[item]) {
        this.renderMap[item](renderedCharts, this.props.result[item]);
        renderedCharts.push(
          <div key={"divider" + this.counter} className="divider"></div>
        )
        this.counter++;
      }
      if (this.props.result.combined[item]) {
        this.renderMap[item](renderedCharts, this.props.result.combined[item]);
        renderedCharts.push(
          <div key={"divider" + this.counter} className="divider"></div>
        )
        this.counter++;
      }
    }
    return renderedCharts;
  }

  renderEntities(renderedCharts, obj) {
    obj.sort((a, b) => {
      if (a.text.slice(0, 1) > b.text.slice(0, 1)) 
        return 1;
      else 
        return -1;
      }
    );
    let options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Entities'
      },
      subtitle: {
        text: 'Items such as persons, places, and organizations that are present in the input t' +
            'ext.'
      },
      xAxis: [
        {
          categories: obj.map(entity => entity.text),
          reversed: false,
          labels: {
            step: 1
          }
        }
      ],
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter: function () {
            return Math.abs(this.value);
          }
        }
      },

      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },

      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b> is ' + Math.abs(this.point.y);
        }
      },

      series: [
        {
          name: 'count',
          data: obj.map(entity => -Number(entity.count))
        }, {
          name: 'relevance',
          data: obj.map(entity => Number(entity.relevance))
        }
      ]
    };
    renderedCharts.push(
      <div key={"chart" + this.counter} className="section hoverable">
        <h5>Concepts</h5>
        <div className="container ">
          <div id="concepts">
            <Chart options={options} container={"#concepts"} type={"Chart"} modules={[]}/>
          </div>
        </div>
      </div>
    );
  }

  renderConcepts(renderedCharts, obj) {
    obj.sort((a, b) => {
      if (a.text.slice(0, 1) > b.text.slice(0, 1)) 
        return 1;
      else 
        return -1;
      }
    );
    let options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Concepts Extraction'
      },
      subtitle: {
        text: 'Identify concepts with based on other concepts an entities that are present in t' +
            'hat text.'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Relevance'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of ' +
            'relevance<br/>'
      },
      series: [
        {
          name: 'Concept',
          colorByPoint: true,
          data: obj.map((concept) => {
            return {
              name: concept.text,
              y: concept.relevance * 100,
              drilldown: null
            }
          })
        }
      ]
    };
    renderedCharts.push(
      <div key={"chart" + this.counter} className="section hoverable">
        <h5>Concepts</h5>
        <div className="container ">
          <div id="concepts">
            <Chart options={options} container={"#concepts"} type={"Chart"} modules={[]}/>
          </div>
        </div>
      </div>
    );
  }

  renderFeeds(renderedCharts, obj) {
    let myfeeds = this.returnStringOrEmpty(obj);
    if (myfeeds != "Empty") {
      myfeeds = obj.map((feed, i) => {
        return (
          <tr key={"feed" + i}>
            <td>
              <a href={feed}>{feed}</a>
            </td>
          </tr>
        )
      });
    }
    renderedCharts.push(
      <div id="feeds" className="section hoverable" key={"chart" + this.counter}>
        <h5>Feeds</h5>
        <table className="centered container">
          <tbody>
            {myfeeds}
          </tbody>
        </table>
      </div>
    );
  }

  renderDocSentiment(renderedCharts, obj) {
    renderedCharts.push(
      <div
        id="docSentiment"
        className="section hoverable"
        key={"chart" + this.counter}>
        <h5>Authors</h5>
        <table className="centered">
          <thead>
            <tr>
              <th>Type</th>
              <th>Score</th>
              <th>Mixed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{obj
                  .type
                  .toUpperCase()
}</td>
              <td>{obj.score}</td>
              <td>{obj.mixed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderAuthors(renderedCharts, obj) {
    let myauthor = this.returnStringOrEmpty(obj.names);
    if (myauthor != "Empty") {
      myauthor = obj
        .names
        .join(", ");
    }
    renderedCharts.push(
      <div id="authors" className="section hoverable" key={"chart" + this.counter}>
        <h5>Authors</h5>
        <table className="centered">
          <thead>
            <tr>
              <th>Confident</th>
              <th>Authors</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{obj
                  .confident
                  .toUpperCase()}</td>
              <td>{myauthor}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderPublicationDate(renderedCharts, obj) {
    let mydate = this.returnStringOrEmpty(obj.date);
    renderedCharts.push(
      <div
        className="section hoverable"
        key={"chart" + this.counter}
        id="publicationDate">
        <h5>Publication Date</h5>
        <table className="centered">
          <thead>
            <tr>
              <th>Confident</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{obj
                  .confident
                  .toUpperCase()}</td>
              <td>{mydate.slice(0, 4) + "-" + mydate.slice(4, 6) + "-" + mydate.slice(6, 8)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderTitle(renderedCharts, obj) {
    renderedCharts.push(
      <div className="section hoverable" key={"chart" + this.counter} id="title">
        <h5>Title</h5>
        <div className="container center-align">
          {obj.toUpperCase()}
        </div>
      </div>
    );
  }

  renderTextExtraction(renderedCharts, obj) {
    renderedCharts.push(
      <div
        className="section hoverable"
        key={"chart" + this.counter}
        id="textExtraction">
        <h5>Text Extraction</h5>
        <div className="container">
          {(() => {
            return obj
              .text
              .split('\n')
              .map((txt, i) => {
                return <div key={i}>
                  {txt}</div>
              });
          })()}
        </div>
      </div>
    )
  }

  renderMicroformats(renderedCharts, obj) {
    renderedCharts.push(
      <div
        className="hoverable section"
        key={"chart" + this.counter}
        id="microformats">
        <h5>Microformats</h5>
        <table className="centered">
          <tbody>
            <tr>
              <td>{this.returnStringOrEmpty(obj.microformats)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  renderLanguageAnalysis(renderedCharts, obj) {
    renderedCharts.push(
      <div
        className="section hoverable responsive-table"
        key={"chart" + this.counter}
        id="languageAnalysis">
        <h5>Language Analysis</h5>
        <table className="centered">
          <thead>
            <tr>
              <th>Language</th>
              <th>Abbreviation</th>
              <th>Native Speakers</th>
              <th>Wikis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{obj
                  .language
                  .toUpperCase()}</td>
              <td>{obj['iso-639-1'] + '/' + obj['iso-639-2'] + '/' + obj['iso-639-3']}</td>
              <td>{obj['native-speakers']}</td>
              <td>
                <a href={obj['ethnologue']} target="_blank">Ethonologue</a>/<a href={obj['wikipedia']} target="_blank">Wikipedia</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="section">
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header">
              <i className="material-icons">filter_drama</i>First</div>
            <div className="collapsible-body">
              {this.renderResult()}
            </div>
          </li>
        </ul>
      </div>
    )
  }
}