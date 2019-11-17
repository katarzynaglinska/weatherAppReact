import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import moment from 'moment';
import 'moment/locale/pl';
import Tab from "./Tab";
import Tabs from "./TabsMenu";
import CurrentData from "./CurrentData";

export default class Chart extends Component {
  //czy na pewno bez var ?
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
  //comparison


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
          false,
          false,
          "airlyChartDataHistory"
        );
        break;
      case "1":
        this.createChartSelected(
          this.datasFromAirlyHistory,
          this.pm25ValuesFromAirlyHistory,
          this.pm10ValuesFromAirlyHistory,
          true,
          "airlyChartDataHistory"
        );
        break;
      case "2":
        this.createChartSelected(
          this.datasFromAirlyHistory,
          this.temperatureFromAirlyHistory,
          false,
          false,
          "airlyChartDataHistory"
        );
        break;
      case "3":
        this.createChartSelected(
          this.datasFromAirlyForecast,
          this.caqiFromAirlyForecast,
          false,
          false,
          "airlyChartDataForecast"
        );
        break;
      case "4":
        this.createChartSelected(
          this.datasFromAirlyForecast,
          this.pm25ValuesFromAirlyForecast,
          this.pm10ValuesFromAirlyForecast,
          true,
          "airlyChartDataForecast"
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

    if (chartType == "airlyChartDataHistory") {
      this.setState({ airlyChartDataHistoryChanged: true });
    } else if (chartType == "airlyChartDataForecast") {
      this.setState({ airlyChartDataForecastChanged: true });
    }
  };

  buildList = res => {
    this.dataFromAirlyCurrent = res.current;
    this.dataFromAirlyHistory = res.history;
    console.log(this.dataFromAirlyHistory);
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

    this.createChartSelected(
      this.datasFromAirlyHistory,
      this.caqiFromAirlyHistory,
      false,
      false,
      "airlyChartDataHistory"
    );
    this.createChartSelected(
      this.datasFromAirlyForecast,
      this.caqiFromAirlyForecast,
      false,
      false,
      "airlyChartDataForecast"
    );

    this.setCurrentDataAirly();
    this.createGraphHistoricMinMax("gda");
  };

  createGraphHistoricMinMax = (type) => {
    const arrMin = arr => Math.min(...arr);
    const arrMax = arr => Math.max(...arr);
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    var minCaquiHistory, minCaquiHistoryIndex, maxCaquiHistory, maxCaquiHistoryIndex, avgCaquiHistory, minArray, maxArray, avgArray;
    if(type == "gda" ){
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
    }
    else if(type == "gdy" ){
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
        this.maxArraySecond= Array(this.caqiFromAirlyHistory.length).fill(null); 
        this.maxArraySecond[maxCaquiHistoryIndex] = maxCaquiHistory;
        this.avgArraySecond = avgArray;
    }

    minArray[minCaquiHistoryIndex] = minCaquiHistory;
    maxArray[maxCaquiHistoryIndex] = maxCaquiHistory;

    this.setState({
      airlyChartDataMinMax: {
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
    //initVC.destroyChart(initVC.chartHistoryMinMax);
    //initVC.chartHistoryMinMax = new Chart(initVC.chartAirlyHistoryIndexMinMax, chart);
}

  setCurrentDataAirly = () => {
    var day = moment.utc(this.dataFromAirlyCurrent.fromDateTime, "YYYY-MM-DD HH:mm:ss");
    var dayNameOfWeek = day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1);
    var dayDate = day.format('DD-MM-YYYY');
    var rate = this.dataFromAirlyCurrent.indexes[0].description;
    var rateValue = this.dataFromAirlyCurrent.indexes[0].value;
    var pm10 = this.dataFromAirlyCurrent.values[2].value;
    var pm25 = this.dataFromAirlyCurrent.values[1].value;
    var pm1 = this.dataFromAirlyCurrent.values[0].value;
    var temperature = this.dataFromAirlyCurrent.values[5].value;
    var pressure = this.dataFromAirlyCurrent.values[3].value;
    var humidity = this.dataFromAirlyCurrent.values[4].value;
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
      //"https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
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
        return (
          <Line
            ref="chart"
            data={this.state.airlyChartDataMinMax.data}
            options={this.state.airlyChartDataMinMax.options}
            redraw
          />
        );
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
    let hasChanged = false;

    return (
      <div>
        <CurrentData dayNameOfWeek={this.state.dayNameOfWeek} dayDate={this.state.dayDate} rate={this.state.rate}
                     rateValue={this.state.rateValue} pm10={this.state.pm10} pm25={this.state.pm25} pm1={this.state.pm1}
                     temperature={this.state.temperature} pressure={this.state.pressure} humidity={this.state.humidity}/>

        
        <div className="informations__row">
          <div className="row_name">Dane historyczne</div>
          <Tabs className="tabs-wrapper" tabTitle="categoryMenuHistory">
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
            <Tab title="TEMPERATURA" changeChartData={this.changeChartData}>
              <div>TEMPERATURA</div>
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
          {this.updateChart("airlyChartDataForecastChanged")
          /*this.state.airlyChartDataForecastChanged ? (this.state.airlyChartDataForecast.isLoaded ?  (this.state.airlyChartDataForecast.type == "line" ? <Line ref="chart" data={this.state.airlyChartDataForecast.data} options={this.state.airlyChartDataForecast.options} redraw/> :  <Bar ref="chart" data={this.state.airlyChartDataForecast.data} options={this.state.airlyChartDataForecast.options} redraw/> ) : <div>Loading...</div>) : (this.state.airlyChartDataForecast.isLoaded ?  (this.state.airlyChartDataForecast.type == "line" ? <Line ref="chart" data={this.state.airlyChartDataForecast.data} options={this.state.airlyChartDataForecast.options} /> :  <Bar ref="chart" data={this.state.airlyChartDataForecast.data} options={this.state.airlyChartDataForecast.options} /> ) : <div>Loading...</div>) */
          }
        </div>
      </div>
    );
  }
}
