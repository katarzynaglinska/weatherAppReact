import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment";
import "moment/locale/pl";
import Tab from "./Tab";
import Tabs from "./TabsMenu";
import CurrentData from "./CurrentData";

export default class Comparison extends Component {
  //First city
  dataFirstCityCurrent = null;
  dataFirstCityHistory = null;
  dataFirstCityForecast = null;
  pm10FirstCityHistory = [];
  pm25FirstCityHistory = [];
  caqiFirstCityHistory = [];
  temperatureFirstCityHistory = [];
  datasFirstCityHistory = [];
  pm10FirstCityForecast = [];
  pm25FirstCityForecast = [];
  caqiFirstCityForecast = [];
  datasFirstCityForecast = [];

  //Second city
  dataSecondCityCurrent = null;
  dataSecondCityHistory = null;
  dataSecondCityForecast = null;
  pm10SecondCityHistory = [];
  pm25SecondCityHistory = [];
  caqiSecondCityHistory = [];
  temperatureSecondCityHistory = [];
  datasSecondCityHistory = [];
  pm10SecondCityForecast = [];
  pm25SecondCityForecast = [];
  caqiSecondCityForecast = [];
  datasSecondCityForecast = [];

  firstData = false;
  secondData = false;

  state = {
    chartDataHistory: {
      isLoaded: false
    },
    chartDataForecast: {
      isLoaded: false
    },
    chartDataMinMax: {
      isLoaded: false
    },
    chartDataHistoryChanged: false,
    chartDataForecastChanged: false,
    chartDataMinMaxChanged: false
  };

  componentDidMount() {
    let firstCityUrl = this.props.firstCityUrl;
    let secondCityUrl = this.props.secondCityUrl;

    Promise.all([fetch(firstCityUrl), fetch(secondCityUrl)])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([res1, res2]) => {
        this.buildFirstCityData(res1);
        this.buildSecondCityData(res2);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.firstCityUrl !== this.props.firstCityUrl) {
      let firstCityUrl = this.props.firstCityUrl;
      fetch(firstCityUrl)
        .then(response => response.json())
        .then( this.buildFirstCityData )
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    }
    if (prevProps.secondCityUrl !== this.props.secondCityUrl) {
      let secondCityUrl = this.props.secondCityUrl;
      fetch(secondCityUrl)
        .then(response => response.json())
        .then( this.buildSecondCityData )
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    }
  }

  buildFirstCityData = res => {
    this.dataFirstCityCurrent = res.current;
    this.dataFirstCityHistory = res.history;
    this.dataFirstCityForecast = res.forecast;
    var dataHistory, dataForecast;
    for (var j = 0; j < this.dataFirstCityHistory.length; j++) {
      dataHistory = this.dataFirstCityHistory[j];
      this.pm10FirstCityHistory[j] = dataHistory.values[2].value;
      this.pm25FirstCityHistory[j] = dataHistory.values[1].value;
      this.caqiFirstCityHistory[j] = dataHistory.indexes[0].value;
      this.temperatureFirstCityHistory[j] = dataHistory.values[5].value;
      this.datasFirstCityHistory[j] = moment
        .utc(dataHistory.fromDateTime)
        .format("DD/MM HH:mm");
    }
    for (var z = 0; z < this.dataFirstCityForecast.length; z++) {
      dataForecast = this.dataFirstCityForecast[z];
      this.pm10FirstCityForecast[z] = dataForecast.values[0].value;
      this.pm25FirstCityForecast[z] = dataForecast.values[1].value;
      this.caqiFirstCityForecast[z] = dataForecast.indexes[0].value;
      this.datasFirstCityForecast[z] = moment
        .utc(dataForecast.fromDateTime)
        .format("DD/MM HH:mm");
    }
    this.changeChartDataOnload();
  };

  buildSecondCityData = res => {
    this.dataSecondCityCurrent = res.current;
    this.dataSecondCityHistory = res.history;
    this.dataSecondCityForecast = res.forecast;
    var dataHistory, dataForecast;

    for (var j = 0; j < this.dataSecondCityHistory.length; j++) {
      dataHistory = this.dataSecondCityHistory[j];
      this.pm10SecondCityHistory[j] = dataHistory.values[2].value;
      this.pm25SecondCityHistory[j] = dataHistory.values[1].value;
      this.caqiSecondCityHistory[j] = dataHistory.indexes[0].value;
      this.temperatureSecondCityHistory[j] = dataHistory.values[5].value;
      this.datasSecondCityHistory[j] = moment
        .utc(dataHistory.fromDateTime)
        .format("DD/MM HH:mm");
   }
    console.log("2222")
    for (var z = 0; z < this.dataSecondCityForecast.length; z++) {
      dataForecast = this.dataSecondCityForecast[z];
      this.pm10SecondCityForecast[z] = dataForecast.values[0].value;
      this.pm25SecondCityForecast[z] = dataForecast.values[1].value;
      this.caqiSecondCityForecast[z] = dataForecast.indexes[0].value;
      this.datasSecondCityForecast[z] = moment
        .utc(dataForecast.fromDateTime)
        .format("DD/MM HH:mm");
    }
    this.changeChartDataOnload();
  };

  changeChartDataOnload = () => {
      this.setState({
        chartDataHistoryChanged: false,
        chartDataForecastChanged: false,
        chartDataMinMaxChanged: false,
        chartDataHistory: {
          isLoaded: false
        },
        chartDataForecast: {
          isLoaded: false
        },
        chartDataMinMax: {
          isLoaded: false
        },
      });
      this.createChartSelected(
        this.datasFirstCityHistory,
        this.caqiFirstCityHistory,
        this.caqiSecondCityHistory,
        true,
        "bar",
        this.props.firstCity,
        this.props.secondCity,
        "chartDataHistory"
      );
      this.setState({
        chartDataForecast: {
          isLoaded: false
        }
      });
      this.createChartSelected(
        this.datasFirstCityForecast,
        this.caqiFirstCityForecast,
        this.caqiSecondCityForecast,
        true,
        "bar",
        this.props.firstCity,
        this.props.secondCity,
        "chartDataForecast"
      );
      this.createGraphHistoricMinMax(this.props.firstCity, this.props.secondCity);
    };


  changeChartData = (tabNumber, tabTitle) => {
    var lineChartDataCaqiHistory;
    if (tabTitle == "categoryMenuPredictionComparison") {
      tabNumber = parseInt(tabNumber) + 4;
      tabNumber = tabNumber.toString();
      this.setState({
        chartDataForecast: {
          isLoaded: false
        }
      });
    } else {
      this.setState({
        chartDataHistory: {
          isLoaded: false
        }
      });
    }
    this.setState({
      chartDataHistoryChanged: false,
      chartDataForecastChanged: false,
      chartDataMinMaxChanged: false
    });
    switch (tabNumber) {
      case "0":
        this.createChartSelected(
          this.datasFirstCityHistory,
          this.caqiFirstCityHistory,
          this.caqiSecondCityHistory,
          true,
          "bar",
          this.props.firstCity,
          this.props.secondCity,
          "chartDataHistory"
        );
        break;
      case "1":
        this.createChartSelected(
          this.datasFirstCityHistory,
          this.pm25FirstCityHistory,
          this.pm25SecondCityHistory,
          true,
          "line",
          this.props.firstCity,
          this.props.secondCity,
          "chartDataHistory"
        );
        break;
      case "2":
        this.createChartSelected(
          this.datasFirstCityHistory,
          this.pm10FirstCityHistory,
          this.pm10SecondCityHistory,
          true,
          "line",
          this.props.firstCity,
          this.props.secondCity,
          "chartDataHistory"
        );
        break;
      case "3":
        this.createChartSelected(
          this.datasFirstCityForecast,
          this.temperatureFirstCityHistory,
          this.temperatureSecondCityHistory,
          true,
          "bar",
          this.props.firstCity,
          this.props.secondCity,
          "chartDataHistory"
        );
        break;
      case "4":
        this.createChartSelected(
          this.datasFirstCityForecast,
          this.caqiFirstCityForecast,
          this.caqiSecondCityForecast,
          true,
          "bar",
          this.props.firstCity,
          this.props.secondCity,
          "chartDataForecast"
        );
        break;
      case "5":
        this.createChartSelected(
          this.datasFirstCityForecast,
          this.pm25FirstCityForecast,
          this.pm25SecondCityForecast,
          true,
          "line",
          this.props.firstCity,
          this.props.secondCity,
          "chartDataForecast"
        );
        break;
      case "6":
        this.createChartSelected(
          this.datasFirstCityForecast,
          this.pm10FirstCityForecast,
          this.pm10SecondCityForecast,
          true,
          "line",
          this.props.firstCity,
          this.props.secondCity,
          "chartDataForecast"
        );
        break;
    }
  };

  createGraphHistoricMinMax = (firstCity, secondCity) => {
    const arrMin = arr => Math.min(...arr);
    const arrMax = arr => Math.max(...arr);
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    var minCaquiHistory,
      minCaquiHistoryIndex,
      maxCaquiHistory,
      maxCaquiHistoryIndex,
      avgCaquiHistory,
      minArray,
      maxArray,
      avgArray;
    //first city
    minCaquiHistory = arrMin(this.caqiFirstCityHistory);
    minCaquiHistoryIndex = this.caqiFirstCityHistory.indexOf(minCaquiHistory);
    maxCaquiHistory = arrMax(this.caqiFirstCityHistory);
    maxCaquiHistoryIndex = this.caqiFirstCityHistory.indexOf(maxCaquiHistory);
    avgCaquiHistory = arrAvg(this.caqiFirstCityHistory).toFixed(2);
    minArray = Array(this.caqiFirstCityHistory.length).fill(null);
    maxArray = Array(this.caqiFirstCityHistory.length).fill(null);
    avgArray = Array(this.caqiFirstCityHistory.length).fill(avgCaquiHistory);
    this.minArrayFirst = Array(this.caqiFirstCityHistory.length).fill(null);
    this.minArrayFirst[minCaquiHistoryIndex] = minCaquiHistory;
    this.maxArrayFirst = Array(this.caqiFirstCityHistory.length).fill(null);
    this.maxArrayFirst[maxCaquiHistoryIndex] = maxCaquiHistory;
    this.avgArrayFirst = avgArray;

    //second city
    minCaquiHistory = arrMin(this.caqiSecondCityHistory);
    minCaquiHistoryIndex = this.caqiSecondCityHistory.indexOf(minCaquiHistory);
    maxCaquiHistory = arrMax(this.caqiSecondCityHistory);
    maxCaquiHistoryIndex = this.caqiSecondCityHistory.indexOf(maxCaquiHistory);
    avgCaquiHistory = arrAvg(this.caqiSecondCityHistory).toFixed(2);
    minArray = Array(this.caqiSecondCityHistory.length).fill(null);
    maxArray = Array(this.caqiSecondCityHistory.length).fill(null);
    avgArray = Array(this.caqiSecondCityHistory.length).fill(avgCaquiHistory);
    this.minArraySecond = Array(this.caqiSecondCityHistory.length).fill(null);
    this.minArraySecond[minCaquiHistoryIndex] = minCaquiHistory;
    this.maxArraySecond = Array(this.caqiSecondCityHistory.length).fill(null);
    this.maxArraySecond[maxCaquiHistoryIndex] = maxCaquiHistory;
    this.avgArraySecond = avgArray;

    this.setState({
      chartDataMinMax: {
        type: "line",
        data: {
          datasets: [
            {
              label: "Wartość średnia " + firstCity,
              data: this.avgArrayFirst,
              fill: false,
              type: "line"
            },
            {
              label: "Wartość średnia " + secondCity,
              data: this.avgArraySecond,
              fill: false,
              type: "line",
              backgroundColor: "#a7a7b1",
              borderColor: "#a7a7b1"
            },
            {
              label: "Maximum " + firstCity,
              backgroundColor: "rgb(48, 134, 204)",
              pointBackgroundColor: "rgb(48, 134, 204)",
              pointBorderColor: "#55bae7",
              data: this.maxArrayFirst
            },
            {
              label: "Maximum " + secondCity,
              backgroundColor: "#00495f",
              pointBackgroundColor: "#00495f",
              pointBorderColor: "#00495f",
              data: this.maxArraySecond
            },
            {
              label: "Minimum " + firstCity,
              backgroundColor: "#18e02a",
              pointBackgroundColor: "#18e02a",
              pointBorderColor: "#18e02a",
              data: this.minArrayFirst
            },
            {
              label: "Minimum " + secondCity,
              backgroundColor: "#00a20f",
              pointBackgroundColor: "#00a20f",
              pointBorderColor: "#00a20f",
              data: this.minArraySecond
            }
          ],
          labels: this.datasFirstCityHistory
        },
        options: {
          legend: {
            display: true
          }
        },
        isLoaded: true
      }
    });
    this.setState({ chartDataMinMaxChanged: true });
  };

  createChartSelected = (labels,data,data2,display,type,label1,label2,chartType) => {
    var chart = chartType;
    if (data2 == false) {
      this.setState({
        [chart]: {
          type: type,
          data: {
            labels: labels,
            datasets: [
              {
                label: false,
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: data
              }
            ]
          },
          options: {
            legend: {
              display: display
            }
          },
          isLoaded: true
        }
      });
    } else {
      this.setState({
        [chart]: {
          type: type,
          data: {
            labels: labels,
            datasets: [
              {
                label: label1,
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: data
              },
              {
                label: label2,
                borderColor: "#999eb1",
                backgroundColor: "#999eb19c",
                fill: true,
                data: data2
              }
            ]
          },
          options: {
            legend: {
              display: display
            }
          },
          isLoaded: true
        }
      });
    }
    if (chartType == "chartDataHistory") {
      this.setState({ chartDataHistoryChanged: true });
    } else if (chartType == "chartDataForecast") {
      this.setState({ chartDataForecastChanged: true });
    }
  };

  updateChart = chartDataChangedType => {
    if (chartDataChangedType == "chartDataHistoryChanged") {
      if (this.state.chartDataHistoryChanged) {
        if (this.state.chartDataHistory.isLoaded) {
          if (this.state.chartDataHistory.type == "line") {
            return (
              <Line
                ref="chart"
                data={this.state.chartDataHistory.data}
                options={this.state.chartDataHistory.options}
                redraw
              />
            );
          } else {
            return (
              <Bar
                ref="chart"
                data={this.state.chartDataHistory.data}
                options={this.state.chartDataHistory.options}
                redraw
              />
            );
          }
        } else {
          return <div>Loading...</div>;
        }
      } else {
        if (this.state.chartDataHistory.type == "line") {
          return (
            <Line
              ref="chart"
              data={this.state.chartDataHistory.data}
              options={this.state.chartDataHistory.options}
            />
          );
        } else {
          if(this.state.chartDataHistory.data && this.state.chartDataHistory.data!= "undefined"){
            return (
              <Bar
                ref="chart"
                data={this.state.chartDataHistory.data}
                options={this.state.chartDataHistory.options}
              />
            );
          }
        }
      }
    } else if (chartDataChangedType == "chartDataMinMaxChanged") {
      if (this.state.chartDataMinMax.isLoaded) {
        return (
          <Line
            ref="chart"
            data={this.state.chartDataMinMax.data}
            options={this.state.chartDataMinMax.options}
            redraw
          />
        );
      }
    } else {
      if (this.state.chartDataForecastChanged) {
        if (this.state.chartDataForecast.isLoaded) {
          if (this.state.chartDataForecast.type == "line") {
            return (
              <Line
                ref="chart"
                data={this.state.chartDataForecast.data}
                options={this.state.chartDataForecast.options}
                redraw
              />
            );
          } else {
            return (
              <Bar
                ref="chart"
                data={this.state.chartDataForecast.data}
                options={this.state.chartDataForecast.options}
                redraw
              />
            );
          }
        } else {
          return <div>Loading...</div>;
        }
      } else {
        if (this.state.chartDataForecast.type == "line") {
          return (
            <Line
              ref="chart"
              data={this.state.chartDataForecast.data}
              options={this.state.chartDataForecast.options}
            />
          );
        } else {
          if(this.state.chartDataForecast.data && this.state.chartDataForecast.data!= "undefined"){
            return (
              <Bar
                ref="chart"
                data={this.state.chartDataForecast.data}
                options={this.state.chartDataForecast.options}
              />
            );
          }
        }
      }
    }
  };

  render() {
    return (
      <div>
        <div className="informations__row">
          <div className="row__title">
            <span className="name__data name__data-first">
              {this.props.firstCity}
            </span>{" "}
            <span className="name__data"> - </span>{" "}
            <span className="name__data name__data-second">
              {this.props.secondCity}
            </span>
          </div>
        </div>
        <div className="informations__row">
          <div className="row_name">Dane historyczne</div>
          <Tabs
            className="tabs-wrapper"
            tabTitle="categoryMenuHistoryComparison"
          >
            <Tab
              active="true"
              title="CAQI"
              changeChartData={this.changeChartData}
            >
              <div>CAQI</div>
            </Tab>
            <Tab title="PM 2.5" changeChartData={this.changeChartData}>
              <div>PM 2.5</div>
            </Tab>
            <Tab title="PM 10" changeChartData={this.changeChartData}>
              <div>PM 10</div>
            </Tab>
            <Tab title="TEMPERATURA" changeChartData={this.changeChartData}>
              <div>Temperatura</div>
            </Tab>
          </Tabs>
          {this.updateChart("chartDataHistoryChanged")}
        </div>
        <div className="informations__row">
          <div className="row_name">
            Ekstrema ogólnej jakości powietrza (CAQI)
          </div>
          {this.updateChart("chartDataMinMaxChanged")}
        </div>
        <div className="informations__row">
          <div className="row_name">Prognoza na nastepne dni</div>
          <Tabs
            className="tabs-wrapper"
            tabTitle="categoryMenuPredictionComparison"
          >
            <Tab
              active="true"
              title="CAQI"
              changeChartData={this.changeChartData}
            >
              <div>CAQI</div>
            </Tab>
            <Tab title="PM 2.5" changeChartData={this.changeChartData}>
              <div>PM 2.5</div>
            </Tab>
            <Tab title="PM 10" changeChartData={this.changeChartData}>
              <div>PM 10</div>
            </Tab>
          </Tabs>
          {this.updateChart("chartDataForecastChanged")}
        </div>
      </div>
    );
  }
}
