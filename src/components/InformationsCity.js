import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import moment from 'moment';
import 'moment/locale/pl';
import Tab from "./Tab";
import Tabs from "./TabsMenu";
import CurrentData from "./CurrentData";

export default class Chart extends Component {
  dataCityCurrent = null;
  dataCityHistory = null;
  dataCityForecast = null;
  pm10History = [];
  pm25History = [];
  caqiHistory = [];
  temperatureHistory = [];
  datasHistory = [];
  pm10Forecast = [];
  pm25Forecast = [];
  caqiForecast = [];
  datasForecast = [];

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
    chartDataMinMaxChanged: false,
    dayNameOfWeek: "",
    dayDate: "",
    rateValue: "",
    pm10: "",
    pm25: "",
    pm1: "",
    temperature: "",
    pressure: "",
    humidity: "",
  };

  changeChartData = (tabNumber, tabTitle) => {
    var lineChartDataCaqiHistory;
    if (tabTitle == "categoryMenuPrediction") {
      tabNumber = parseInt(tabNumber) + 3;
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
          this.datasHistory,
          this.caqiHistory,
          false,
          false,
          "chartDataHistory"
        );
        break;
      case "1":
        this.createChartSelected(
          this.datasHistory,
          this.pm25History,
          this.pm10History,
          true,
          "chartDataHistory"
        );
        break;
      case "2":
        this.createChartSelected(
          this.datasHistory,
          this.temperatureHistory,
          false,
          false,
          "chartDataHistory"
        );
        break;
      case "3":
        this.createChartSelected(
          this.datasForecast,
          this.caqiForecast,
          false,
          false,
          "chartDataForecast"
        );
        break;
      case "4":
        this.createChartSelected(
          this.datasForecast,
          this.pm25Forecast,
          this.pm10Forecast,
          true,
          "chartDataForecast"
        );
        break;
    }
  };

  createChartSelected = (labels, data, data2, display, chartType) => {
    var chart = chartType;
    if (data2 == false) {
      this.setState({
        [chart]: {
          type: "bar",
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
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "PM2.5",
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: data
              },
              {
                label: "PM10",
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

  buildList = res => {
    this.dataCityCurrent = res.current;
    this.dataCityHistory = res.history;
    this.dataCityForecast = res.forecast;
    {
      this.dataCityHistory.map(
        (object, i) =>
          (this.pm10History[i] = object.values[2].value)
      );
    }
    {
      this.dataCityHistory.map(
        (object, i) =>
          (this.pm25History[i] = object.values[1].value)
      );
    }
    {
      this.dataCityHistory.map(
        (object, i) => (this.caqiHistory[i] = object.indexes[0].value)
      );
    }
    {
      this.dataCityHistory.map(
        (object, i) =>
          (this.temperatureHistory[i] = object.values[5].value)
      );
    }
    {
      this.dataCityHistory.map(
        (object, i) =>
          (this.datasHistory[i] = moment.utc(
            this.dataCityHistory[i].fromDateTime
          ).format("DD/MM HH:mm"))
      );
    }
    {
      this.dataCityForecast.map(
        (object, i) =>
          (this.pm10Forecast[i] = object.values[0].value)
      );
    }
    {
      this.dataCityForecast.map(
        (object, i) =>
          (this.pm25Forecast[i] = object.values[1].value)
      );
    }
    {
      this.dataCityForecast.map(
        (object, i) => (this.caqiForecast[i] = object.indexes[0].value)
      );
    }
    {
      this.dataCityForecast.map(
        (object, i) =>
          (this.datasForecast[i] = moment.utc(
            this.dataCityForecast[i].fromDateTime
          ).format("DD/MM HH:mm"))
      );
    }

    this.createChartSelected(
      this.datasHistory,
      this.caqiHistory,
      false,
      false,
      "chartDataHistory"
    );
    this.createChartSelected(
      this.datasForecast,
      this.caqiForecast,
      false,
      false,
      "chartDataForecast"
    );

    this.setCurrentDataOnStart();
    this.createGraphHistoricMinMax("firstCity");
  };

  createGraphHistoricMinMax = (type) => {
    const arrMin = arr => Math.min(...arr);
    const arrMax = arr => Math.max(...arr);
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    var minCaquiHistory, minCaquiHistoryIndex, maxCaquiHistory, maxCaquiHistoryIndex, avgCaquiHistory, minArray, maxArray, avgArray;
    if(type == "firstCity" ){
        minCaquiHistory = arrMin(this.caqiHistory);
        minCaquiHistoryIndex = this.caqiHistory.indexOf(minCaquiHistory);
        maxCaquiHistory = arrMax(this.caqiHistory);
        maxCaquiHistoryIndex = this.caqiHistory.indexOf(maxCaquiHistory);
        avgCaquiHistory = arrAvg(this.caqiHistory).toFixed(2);;
        minArray = Array(this.caqiHistory.length).fill(null);    
        maxArray = Array(this.caqiHistory.length).fill(null); 
        avgArray = Array(this.caqiHistory.length).fill(avgCaquiHistory); 
        this.minArrayFirst= Array(this.caqiHistory.length).fill(null); 
        this.minArrayFirst[minCaquiHistoryIndex] = minCaquiHistory;
        this.maxArrayFirst= Array(this.caqiHistory.length).fill(null); 
        this.maxArrayFirst[maxCaquiHistoryIndex] = maxCaquiHistory;
        this.avgArrayFirst = avgArray;
    }
    else if(type == "secondCity" ){
        minCaquiHistory = arrMin(this.caqiHistoryGdy);
        minCaquiHistoryIndex = this.caqiHistoryGdy.indexOf(minCaquiHistory);
        maxCaquiHistory = arrMax(this.caqiHistoryGdy);
        maxCaquiHistoryIndex = this.caqiHistoryGdy.indexOf(maxCaquiHistory);
        avgCaquiHistory = arrAvg(this.caqiHistoryGdy).toFixed(2);;
        minArray = Array(this.caqiHistoryGdy.length).fill(null);    
        maxArray = Array(this.caqiHistoryGdy.length).fill(null); 
        avgArray = Array(this.caqiHistoryGdy.length).fill(avgCaquiHistory);
        this.minArraySecond= Array(this.caqiHistoryGdy.length).fill(null);
        this.minArraySecond[minCaquiHistoryIndex] = minCaquiHistory;
        this.maxArraySecond= Array(this.caqiHistory.length).fill(null); 
        this.maxArraySecond[maxCaquiHistoryIndex] = maxCaquiHistory;
        this.avgArraySecond = avgArray;
    }

    minArray[minCaquiHistoryIndex] = minCaquiHistory;
    maxArray[maxCaquiHistoryIndex] = maxCaquiHistory;

    this.setState({
      chartDataMinMax: {
        type: 'line',
        data: {
            datasets: [
                {
                label: 'Wartość średnia',
                data: avgArray,
                fill: false,
                type: 'line'
            },
            {
                label: 'Maximum',
                backgroundColor: "rgb(48, 134, 204)",
                pointBackgroundColor: "rgb(48, 134, 204)",
                pointBorderColor: "#55bae7",
                data: maxArray
            },
            {
                label: 'Minimum',
                backgroundColor: "#18e02a",
                pointBackgroundColor: "#18e02a",
                pointBorderColor: "#18e02a",
                data: minArray
            },],
            labels: this.datasHistory
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
  }

  setCurrentData = () => {
    var temperature = this.dataCityCurrent.values[5].value;
    this.setState({
      temperature: temperature,
    });
  }

  setCurrentDataOnStart = () => {
    var day = moment.utc(this.dataCityCurrent.fromDateTime, "YYYY-MM-DD HH:mm:ss");
    var dayNameOfWeek = day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1);
    var dayDate = day.format('DD-MM-YYYY');
    var rate = this.dataCityCurrent.indexes[0].description;
    var rateValue = this.dataCityCurrent.indexes[0].value;
    var pm10 = this.dataCityCurrent.values[2].value;
    var pm25 = this.dataCityCurrent.values[1].value;
    var pm1 = this.dataCityCurrent.values[0].value;
    var temperature = this.dataCityCurrent.values[5].value;
    var pressure = this.dataCityCurrent.values[3].value;
    var humidity = this.dataCityCurrent.values[4].value;
    this.setState({
      dayNameOfWeek: dayNameOfWeek,
      dayDate: dayDate,
      rate: rate,
      rateValue: rateValue,
      pm10: pm10,
      pm25: pm25,
      pm1: pm1,
      temperature: temperature,
      pressure: pressure,
      humidity: humidity,
    });
  }


  componentDidMount() {
    let url = this.props.url;
    fetch(url)
      .then(response => response.json())
      .then(this.buildList)
      .catch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      let url = this.props.url; 
      fetch(url)
        .then(response => response.json())
        .then(this.buildList)
        .catch(err => {
          console.log("Error Reading data " + err);
        });
    }
  }

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
            return (
              <Bar
                ref="chart"
                data={this.state.chartDataHistory.data}
                options={this.state.chartDataHistory.options}
              />
            );
          }
        }
      } else if(chartDataChangedType == "chartDataMinMaxChanged"){
        return (
          <Line
            ref="chart"
            data={this.state.chartDataMinMax.data}
            options={this.state.chartDataMinMax.options}
            redraw
          />
        );
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
  };


  render() {
    return (
      <div>
        <CurrentData cityName={this.props.cityName} dayNameOfWeek={this.state.dayNameOfWeek} dayDate={this.state.dayDate} rate={this.state.rate}
                     rateValue={this.state.rateValue} pm10={this.state.pm10} pm25={this.state.pm25} pm1={this.state.pm1}
                     temperature={this.state.temperature} pressure={this.state.pressure} humidity={this.state.humidity}/>

        
        <div className="informations__row">
          <div className="row_name">Dane historyczne</div>
          <Tabs className="tabs-wrapper" tabTitle="categoryMenuHistory">
            <Tab active="true" title="CAQI" changeChartData={this.changeChartData}>
              <div>CAQI</div>
            </Tab>
            <Tab title="PM" changeChartData={this.changeChartData}>
              <div>PM</div>
            </Tab>
            <Tab title="TEMPERATURA" changeChartData={this.changeChartData}>
              <div>TEMPERATURA</div>
            </Tab>
          </Tabs>
          {  this.updateChart("chartDataHistoryChanged") }
        </div>
        <div className="informations__row">
            <div className="row_name">Ekstrema ogólnej jakości powietrza (CAQI)</div>
            {  this.updateChart("chartDataMinMaxChanged") }
        </div>
        <div className="informations__row">
          <div className="row_name">Prognoza na nastepne dni</div>
          <Tabs className="tabs-wrapper" tabTitle="categoryMenuPrediction">
            <Tab
              active="true"
              title="CAQI"
              changeChartData={this.changeChartData}
            >
              <div>CAQI</div>
            </Tab>
            <Tab title="PM" changeChartData={this.changeChartData}>
              <div>PM</div>
            </Tab>
          </Tabs>
          {this.updateChart("chartDataForecastChanged")
        }
        </div>
      </div>
    );
  }
}
