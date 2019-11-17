import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import moment from 'moment';
import 'moment/locale/pl';
import Tab from "./Tab";
import Tabs from "./TabsMenu";
import CurrentData from "./CurrentData";

export default class Comparison extends Component {
    //First city
    dataFromAirlyCurrent = null;
    dataFromAirlyHistory = null;
    dataFromAirlyForecast = null;
    pm10ValuesFromAirlyHistory = [];
    pm25ValuesFromAirlyHistory = [];
    caqiFromAirlyHistory = [];
    temperatureFromAirlyHistory = [];
    datasFromAirlyHistory = [];
    pm10ValuesFromAirlyForecast = [];
    pm25ValuesFromAirlyForecast = [];
    caqiFromAirlyForecast = [];
    datasFromAirlyForecast = [];
    
    //Second city
    dataFromAirlyCurrent2 = null;
    dataFromAirlyHistory2 = null;
    dataFromAirlyForecast2 = null;
    pm10ValuesFromAirlyHistory2 = [];
    pm25ValuesFromAirlyHistory2 = [];
    caqiFromAirlyHistory2 = [];
    temperatureFromAirlyHistory2 = [];
    datasFromAirlyHistory2 = [];
    pm10ValuesFromAirlyForecast2 = [];
    pm25ValuesFromAirlyForecast2 = [];
    caqiFromAirlyForecast2 = [];
    datasFromAirlyForecast2 = [];

  state = {
    airlyChartDataHistory: {
      isLoaded: false
    },
    airlyChartDataForecast: {
      isLoaded: false
    },
    airlyChartDataMinMax: {
      isLoaded: false
    },
    airlyChartDataHistoryChanged: false,
    airlyChartDataForecastChanged: false,
    airlyChartDataMinMaxChanged: false,
  };

  
  componentDidMount() {
    let url1 = this.props.url1;
    let url2 = this.props.url2;

    Promise.all([fetch(url1), fetch(url2)])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([res1, res2]) => {
        this.buildList1(res1);
        this.buildList2(res2);
    });

  }

  componentDidUpdate(prevProps) {
    if (prevProps.url1 !== this.props.url1) {
      let url1 = this.props.url1; 
      fetch(url1)
        .then(response => response.json())
        .then(this.buildList1)
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    }
    if (prevProps.url2 !== this.props.url2) {
        let url2 = this.props.url2; 
        fetch(url2)
          .then(response => response.json())
          .then(this.buildList2)
          .catch(err => {
            console.log("Error Reading data " + err);
          });
          console.log(this.props.secondCity)
      }
  }

  buildList1 = res => {
      console.log(res);
    this.dataFromAirlyCurrent = res.current;
    this.dataFromAirlyHistory = res.history;
    this.dataFromAirlyForecast = res.forecast;
    {
      this.dataFromAirlyHistory.map(
        (object, i) =>
          (this.pm10ValuesFromAirlyHistory[i] = object.values[2].value)
      );
    }
    {
      this.dataFromAirlyHistory.map(
        (object, i) =>
          (this.pm25ValuesFromAirlyHistory[i] = object.values[1].value)
      );
    }
    {
      this.dataFromAirlyHistory.map(
        (object, i) => (this.caqiFromAirlyHistory[i] = object.indexes[0].value)
      );
    }
    {
      this.dataFromAirlyHistory.map(
        (object, i) =>
          (this.temperatureFromAirlyHistory[i] = object.values[5].value)
      );
    }
    {
      this.dataFromAirlyHistory.map(
        (object, i) =>
          (this.datasFromAirlyHistory[i] = moment.utc(
            this.dataFromAirlyHistory[i].fromDateTime
          ).format("DD/MM HH:mm"))
      );
    }
    {
      this.dataFromAirlyForecast.map(
        (object, i) =>
          (this.pm10ValuesFromAirlyForecast[i] = object.values[0].value)
      );
    }
    {
      this.dataFromAirlyForecast.map(
        (object, i) =>
          (this.pm25ValuesFromAirlyForecast[i] = object.values[1].value)
      );
    }
    {
      this.dataFromAirlyForecast.map(
        (object, i) => (this.caqiFromAirlyForecast[i] = object.indexes[0].value)
      );
    }
    {
      this.dataFromAirlyForecast.map(
        (object, i) =>
          (this.datasFromAirlyForecast[i] = moment.utc(
            this.dataFromAirlyForecast[i].fromDateTime
          ).format("DD/MM HH:mm"))
      );
    }

    //this.createGraphHistoricMinMax(this.props.firstCity, this.props.secondCity);
    this.changeChartDataOnload();
  };


  buildList2 = res => {
    this.dataFromAirlyCurrent2 = res.current;
    this.dataFromAirlyHistory2 = res.history;
    this.dataFromAirlyForecast2 = res.forecast;
    {
      this.dataFromAirlyHistory2.map(
        (object, i) =>
          (this.pm10ValuesFromAirlyHistory2[i] = object.values[2].value)
      );
    }
    {
      this.dataFromAirlyHistory2.map(
        (object, i) =>
          (this.pm25ValuesFromAirlyHistory2[i] = object.values[1].value)
      );
    }
    {
      this.dataFromAirlyHistory2.map(
        (object, i) => (this.caqiFromAirlyHistory2[i] = object.indexes[0].value)
      );
    }
    {
      this.dataFromAirlyHistory2.map(
        (object, i) =>
          (this.temperatureFromAirlyHistory2[i] = object.values[5].value)
      );
    }
    {
      this.dataFromAirlyHistory2.map(
        (object, i) =>
          (this.datasFromAirlyHistory2[i] = moment.utc(
            this.dataFromAirlyHistory2[i].fromDateTime
          ).format("DD/MM HH:mm"))
      );
    }
    {
      this.dataFromAirlyForecast2.map(
        (object, i) =>
          (this.pm10ValuesFromAirlyForecast2[i] = object.values[0].value)
      );
    }
    {
      this.dataFromAirlyForecast2.map(
        (object, i) =>
          (this.pm25ValuesFromAirlyForecast2[i] = object.values[1].value)
      );
    }
    {
      this.dataFromAirlyForecast2.map(
        (object, i) => (this.caqiFromAirlyForecast2[i] = object.indexes[0].value)
      );
    }
    {
      this.dataFromAirlyForecast2.map(
        (object, i) =>
          (this.datasFromAirlyForecast2[i] = moment.utc(
            this.dataFromAirlyForecast2[i].fromDateTime
          ).format("DD/MM HH:mm"))
      );    
    }
    this.changeChartDataOnload();
  };

  changeChartDataOnload = () => {
    console.log("test change ")
    this.setState({
        airlyChartDataForecast: {
            isLoaded: false
        },
        airlyChartDataHistory: {
            isLoaded: false
        },
        airlyChartDataMinMax: {
            isLoaded: false
        },
    });
    this.setState({
      airlyChartDataHistoryChanged: false,
      airlyChartDataForecastChanged: false,
      airlyChartDataMinMaxChanged: false
    });

    this.createChartSelected(
        this.datasFromAirlyHistory,
        this.caqiFromAirlyHistory,
        this.caqiFromAirlyHistory2,
        true,
        'bar',
        this.props.firstCity, 
        this.props.secondCity,
        "airlyChartDataHistory"
    );
    this.createChartSelected(
        this.datasFromAirlyForecast,
        this.caqiFromAirlyForecast,
        this.caqiFromAirlyForecast2,
        true,
        'bar',
        this.props.firstCity, 
        this.props.secondCity,
        "airlyChartDataForecast"
    );
    
    this.createGraphHistoricMinMax(this.props.firstCity, this.props.secondCity);
  }

  changeChartData = (tabNumber, tabTitle) => {
    console.log("test change ")
    var lineChartDataCaqiHistory;
    if (tabTitle == "categoryMenuPredictionComparison") {
      tabNumber = parseInt(tabNumber) + 4;
      tabNumber = tabNumber.toString();
      this.setState({
        airlyChartDataForecast: {
          isLoaded: false
        }
      });
    } else {
      this.setState({
        airlyChartDataHistory: {
          isLoaded: false
        }
      });
    }
    this.setState({
      airlyChartDataHistoryChanged: false,
      airlyChartDataForecastChanged: false,
      airlyChartDataMinMaxChanged: false
    });
    switch (tabNumber) {
      case "0":
        this.createChartSelected(
          this.datasFromAirlyHistory,
          this.caqiFromAirlyHistory,
          this.caqiFromAirlyHistory2,
          true,
          'bar',
          this.props.firstCity, 
          this.props.secondCity,
          "airlyChartDataHistory"
        );
        break;
      case "1":
        this.createChartSelected(
            this.datasFromAirlyHistory,
            this.pm25ValuesFromAirlyHistory,
            this.pm25ValuesFromAirlyHistory2,
            true, 
            'line', 
            this.props.firstCity, 
            this.props.secondCity,
            "airlyChartDataHistory"
        );
        break;
     case "2":
            this.createChartSelected(
            this.datasFromAirlyHistory,
            this.pm10ValuesFromAirlyHistory,
            this.pm10ValuesFromAirlyHistory2,
            true,
            'line', 
            this.props.firstCity, 
            this.props.secondCity,
            "airlyChartDataHistory"
        );
        break;
  case "3":
        this.createChartSelected(
          this.datasFromAirlyForecast,
          this.temperatureFromAirlyHistory,
          this.temperatureFromAirlyHistory2,
          true,
          'bar',
          this.props.firstCity, 
          this.props.secondCity,
          "airlyChartDataHistory"
        );
        break;
      case "4":
        this.createChartSelected(
          this.datasFromAirlyForecast,
          this.caqiFromAirlyForecast,
          this.caqiFromAirlyForecast2,
          true,
          'bar',
          this.props.firstCity, 
          this.props.secondCity,
          "airlyChartDataForecast"
        );
        break;
    case "5":
        this.createChartSelected(
            this.datasFromAirlyForecast,
            this.pm25ValuesFromAirlyForecast,
            this.pm25ValuesFromAirlyForecast2,
            true,
            'line',
            this.props.firstCity, 
            this.props.secondCity,
            "airlyChartDataForecast"
        );
        break;
    case "6":
        this.createChartSelected(
            this.datasFromAirlyForecast,
            this.pm10ValuesFromAirlyForecast,
            this.pm10ValuesFromAirlyForecast2,
            true,
            'line',
            this.props.firstCity, 
            this.props.secondCity,
            "airlyChartDataForecast"
        );
        break;
    }
 };
  
  createGraphHistoricMinMax = (firstCity, secondCity) => {
    const arrMin = arr => Math.min(...arr);
    const arrMax = arr => Math.max(...arr);
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    var minCaquiHistory, minCaquiHistoryIndex, maxCaquiHistory, maxCaquiHistoryIndex, avgCaquiHistory, minArray, maxArray, avgArray;
    //first city
    minCaquiHistory = arrMin(this.caqiFromAirlyHistory);
    minCaquiHistoryIndex = this.caqiFromAirlyHistory.indexOf(minCaquiHistory);
    maxCaquiHistory = arrMax(this.caqiFromAirlyHistory);
    maxCaquiHistoryIndex = this.caqiFromAirlyHistory.indexOf(maxCaquiHistory);
    avgCaquiHistory = arrAvg(this.caqiFromAirlyHistory).toFixed(2);;
    minArray = Array(this.caqiFromAirlyHistory.length).fill(null);    
    maxArray = Array(this.caqiFromAirlyHistory.length).fill(null); 
    avgArray = Array(this.caqiFromAirlyHistory.length).fill(avgCaquiHistory); 
    this.minArrayFirst= Array(this.caqiFromAirlyHistory.length).fill(null); 
    this.minArrayFirst[minCaquiHistoryIndex] = minCaquiHistory;
    this.maxArrayFirst= Array(this.caqiFromAirlyHistory.length).fill(null); 
    this.maxArrayFirst[maxCaquiHistoryIndex] = maxCaquiHistory;
    this.avgArrayFirst = avgArray;

    //second city
    minCaquiHistory = arrMin(this.caqiFromAirlyHistory2);
    minCaquiHistoryIndex = this.caqiFromAirlyHistory2.indexOf(minCaquiHistory);
    maxCaquiHistory = arrMax(this.caqiFromAirlyHistory2);
    maxCaquiHistoryIndex = this.caqiFromAirlyHistory2.indexOf(maxCaquiHistory);
    avgCaquiHistory = arrAvg(this.caqiFromAirlyHistory2).toFixed(2);;
    minArray = Array(this.caqiFromAirlyHistory2.length).fill(null);    
    maxArray = Array(this.caqiFromAirlyHistory2.length).fill(null); 
    avgArray = Array(this.caqiFromAirlyHistory2.length).fill(avgCaquiHistory);
    this.minArraySecond= Array(this.caqiFromAirlyHistory2.length).fill(null);
    this.minArraySecond[minCaquiHistoryIndex] = minCaquiHistory;
    this.maxArraySecond= Array(this.caqiFromAirlyHistory.length).fill(null); 
    this.maxArraySecond[maxCaquiHistoryIndex] = maxCaquiHistory;
    this.avgArraySecond = avgArray;

    this.setState({
      airlyChartDataMinMax: {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Wartość średnia ' + firstCity,
                    data: this.avgArrayFirst,
                    fill: false,
                    type: 'line'
                },
                {
                    label: 'Wartość średnia ' + secondCity,
                    data: this.avgArraySecond,
                    fill: false,
                    type: 'line',
                    backgroundColor: "#a7a7b1",
                    borderColor: "#a7a7b1",
                },
                {
                    label: 'Maximum ' + firstCity,
                    backgroundColor: "rgb(48, 134, 204)",
                    pointBackgroundColor: "rgb(48, 134, 204)",
                    pointBorderColor: "#55bae7",
                    data: this.maxArrayFirst
                },
                {
                    label: 'Maximum ' + secondCity,
                    backgroundColor: "#00495f",
                    pointBackgroundColor: "#00495f",
                    pointBorderColor: "#00495f",
                    data: this.maxArraySecond
                },
                {
                    label: 'Minimum ' + firstCity,
                    backgroundColor: "#18e02a",
                    pointBackgroundColor: "#18e02a",
                    pointBorderColor: "#18e02a",
                    data: this.minArrayFirst
                },
                {
                    label: 'Minimum ' + secondCity,
                    backgroundColor: "#00a20f",
                    pointBackgroundColor: "#00a20f",
                    pointBorderColor: "#00a20f",
                    data: this.minArraySecond
                },
            ],
            labels: this.datasFromAirlyHistory
        },
        options: {
            legend: {
                display: true
            }
        },
        isLoaded: true
      }
    });
    this.setState({ airlyChartDataMinMaxChanged: true });
}

createChartSelected = (labels, data, data2, display, type, label1, label2, chartType) => {
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
    console.log("chartType " + label2 + chartType);
    if (chartType == "airlyChartDataHistory") {
      this.setState({ airlyChartDataHistoryChanged: true });
    } else if (chartType == "airlyChartDataForecast") {
      this.setState({ airlyChartDataForecastChanged: true });
    }
  };


 
  updateChart = airlyChartDataChangedType => {
      if (airlyChartDataChangedType == "airlyChartDataHistoryChanged") {
        if (this.state.airlyChartDataHistoryChanged) {
          if (this.state.airlyChartDataHistory.isLoaded) {
            if (this.state.airlyChartDataHistory.type == "line") {
              return (
                <Line
                  ref="chart"
                  data={this.state.airlyChartDataHistory.data}
                  options={this.state.airlyChartDataHistory.options}
                  redraw
                />
              );
            } else {
              return (
                <Bar
                  ref="chart"
                  data={this.state.airlyChartDataHistory.data}
                  options={this.state.airlyChartDataHistory.options}
                  redraw
                />
              );
            }
          } else {
            return <div>Loading...</div>;
          }
        } else {
          if (this.state.airlyChartDataHistory.type == "line") {
            return (
              <Line
                ref="chart"
                data={this.state.airlyChartDataHistory.data}
                options={this.state.airlyChartDataHistory.options}
              />
            );
          } else {
            return (
              <Bar
                ref="chart"
                data={this.state.airlyChartDataHistory.data}
                options={this.state.airlyChartDataHistory.options}
              />
            );
          }
        }
      } else if(airlyChartDataChangedType == "airlyChartDataMinMaxChanged"){
        if (this.state.airlyChartDataMinMax.isLoaded) {
            return (
                <Line
                ref="chart"
                data={this.state.airlyChartDataMinMax.data}
                options={this.state.airlyChartDataMinMax.options}
                redraw
                />
            );
        }
      } else {
        if (this.state.airlyChartDataForecastChanged) {
          if (this.state.airlyChartDataForecast.isLoaded) {
            if (this.state.airlyChartDataForecast.type == "line") {
              return (
                <Line
                  ref="chart"
                  data={this.state.airlyChartDataForecast.data}
                  options={this.state.airlyChartDataForecast.options}
                  redraw
                />
              );
            } else {
              return (
                <Bar
                  ref="chart"
                  data={this.state.airlyChartDataForecast.data}
                  options={this.state.airlyChartDataForecast.options}
                  redraw
                />
              );
            }
          } else {
            return <div>Loading...</div>;
          }
        } else {
          if (this.state.airlyChartDataForecast.type == "line") {
            return (
              <Line
                ref="chart"
                data={this.state.airlyChartDataForecast.data}
                options={this.state.airlyChartDataForecast.options}
              />
            );
          } else {
            return (
              <Bar
                ref="chart"
                data={this.state.airlyChartDataForecast.data}
                options={this.state.airlyChartDataForecast.options}
              />
            );
          }
        }
      }
  };



  render() {
    return (
      <div>
        <div className="informations__row">
            <div className="row__title"><span className="name__data name__data-first">{this.props.firstCity}</span> <span className="name__data"> - </span> <span className="name__data name__data-second">{this.props.secondCity}</span></div>
        </div>
        <div className="informations__row">
          <div className="row_name">Dane historyczne</div>
          <Tabs className="tabs-wrapper" tabTitle="categoryMenuHistoryComparison">
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
          {  this.updateChart("airlyChartDataHistoryChanged") }
        </div>
        <div className="informations__row">
            <div className="row_name">Ekstrema ogólnej jakości powietrza (CAQUI)</div>
            {  this.updateChart("airlyChartDataMinMaxChanged") }
        </div>
        <div className="informations__row">
          <div className="row_name">Prognoza na nastepne dni</div>
          <Tabs className="tabs-wrapper" tabTitle="categoryMenuPredictionComparison">
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
          {this.updateChart("airlyChartDataForecastChanged")
           }
        </div>
      </div>
    );
  }
}
