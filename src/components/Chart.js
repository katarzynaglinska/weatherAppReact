import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import moment from 'moment';
import Tab from './Tab';
import Tabs from './TabsMenu';

export default class LineDemo extends Component {

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
  state = {
    airlyChartDataHistory: {
      isLoaded: false,
    }, 
    airlyChartDataForecast: {
      isLoaded: false,
    }, 
    isLoaded: false,
    airlyChartDataHistoryChanged: false,
    airlyChartDataForecastChanged: false,
  }

  changeChartData = (tabNumber, tabTitle) => {
    var lineChartDataCaqiHistory;
    if(tabTitle == "categoryMenuPrediction"){
      tabNumber = parseInt(tabNumber) + 3;
      tabNumber = tabNumber.toString();
      this.setState({airlyChartDataForecast: {
        isLoaded: false,
      }, }); 
    }
    else{
      this.setState({airlyChartDataHistory: {
        isLoaded: false,
      }, }); 
    }
    //this.setState({isLoaded: false}); 
    this.setState({airlyChartDataHistoryChanged: false, airlyChartDataForecastChanged: false}); 
    switch(tabNumber) {
      case '0':
          this.createChartSelected(this.datasFromAirlyHistory, this.caqiFromAirlyHistory, false, false, "airlyChartDataHistory");
          break;
      case '1':
          this.createChartSelected(this.datasFromAirlyHistory, this.pm25ValuesFromAirlyHistory, this.pm10ValuesFromAirlyHistory, true, "airlyChartDataHistory");
          break;
      case '2':
          this.createChartSelected(this.datasFromAirlyHistory, this.temperatureFromAirlyHistory, false, false, "airlyChartDataHistory");
          break;
      case '3':
          this.createChartSelected(this.datasFromAirlyForecast, this.caqiFromAirlyForecast, false, false, "airlyChartDataForecast");
          break;
      case '4':
          this.createChartSelected(this.datasFromAirlyForecast, this.pm25ValuesFromAirlyForecast, this.pm10ValuesFromAirlyForecast, true, "airlyChartDataForecast");
          break;
    }

   
  }

  createChartSelected = (labels, data, data2, display, chartType) => {
    var chart = chartType;

    if(data2 == false){
      this.setState({
        [chart]: {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
                label: false,
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: data,
            }]
          },
          options: {
            legend: {
                display: display
            },
         },
         isLoaded: true,
        },
         isLoaded: true
      })
    }
    else{
      console.log("1");
      this.setState({
        [chart]: {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
                label: 'PM2.5',
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: data,
            }, {
                label: 'PM10',
                borderColor: "#999eb1",
                backgroundColor: "#999eb19c",
                fill: true,
                data: data2,
            }],
          },
          options: {
            legend: {
                display: display
            }
          },
          isLoaded: true,
         },
         isLoaded: true
      })
    }
    if(chartType == "airlyChartDataHistory"){
      this.setState({airlyChartDataHistoryChanged: true}); 
    }
    else if(chartType == "airlyChartDataForecast"){
      this.setState({airlyChartDataForecastChanged: true}); 
    }

    console.log(this.state);
  }

  buildList = (res) => {
      console.log("buildList");
      this.dataFromAirlyHistory = res.history;
      this.dataFromAirlyForecast = res.forecast;
      {this.dataFromAirlyHistory.map((object, i) => this.pm10ValuesFromAirlyHistory[i] = object.values[2].value )}
      {this.dataFromAirlyHistory.map((object, i) => this.pm25ValuesFromAirlyHistory[i] = object.values[1].value )}
      {this.dataFromAirlyHistory.map((object, i) => this.caqiFromAirlyHistory[i] = object.indexes[0].value )}
      {this.dataFromAirlyHistory.map((object, i) => this.temperatureFromAirlyHistory[i] = object.values[5].value )}
      {this.dataFromAirlyHistory.map((object, i) => this.datasFromAirlyHistory[i] = moment(this.dataFromAirlyHistory[i].fromDateTime).format('DD/MM HH:mm') )}
      {this.dataFromAirlyForecast.map((object, i) => this.pm10ValuesFromAirlyForecast[i] = object.values[0].value )}
      {this.dataFromAirlyForecast.map((object, i) => this.pm25ValuesFromAirlyForecast[i] = object.values[1].value )}
      {this.dataFromAirlyForecast.map((object, i) => this.caqiFromAirlyForecast[i] = object.indexes[0].value )}
      {this.dataFromAirlyForecast.map((object, i) => this.datasFromAirlyForecast[i] = moment(this.dataFromAirlyForecast[i].fromDateTime).format('DD/MM HH:mm') )}

      this.createChartSelected(this.datasFromAirlyHistory, this.caqiFromAirlyHistory, false, false, "airlyChartDataHistory");
      this.createChartSelected(this.datasFromAirlyForecast, this.caqiFromAirlyForecast, false, false, "airlyChartDataForecast");
}

componentDidMount() {
  let url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
  fetch(url)
  .then(response => response.json())
  .then(this.buildList)
  .catch()
}

render() {

  let hasChanged = false;
  if(this.state.airlyChartDataHistoryChanged){

  }
  else{
    
  }
 
  return (
    <div>

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
      { this.state.airlyChartDataHistoryChanged ? ( this.state.airlyChartDataHistory.isLoaded ?  (  this.state.airlyChartDataHistory.type == "line" ? <Line ref="chart" data={this.state.airlyChartDataHistory.data} options={this.state.airlyChartDataHistory.options} redraw /> :  <Bar ref="chart" data={this.state.airlyChartDataHistory.data} options={this.state.airlyChartDataHistory.options} redraw /> ) : <div>Loading...</div>) :  ( this.state.airlyChartDataHistory.isLoaded ?  (  this.state.airlyChartDataHistory.type == "line" ? <Line ref="chart" data={this.state.airlyChartDataHistory.data} options={this.state.airlyChartDataHistory.options}  /> :  <Bar ref="chart" data={this.state.airlyChartDataHistory.data} options={this.state.airlyChartDataHistory.options}  /> ) : <div>Loading...</div>) }
  </div>

   
    <div className="informations__row">
    <div className="row_name">Prognoza na nastepne dni</div>
    <Tabs className="tabs-wrapper" tabTitle="categoryMenuPrediction">
      <Tab active="true" title="CAQI" changeChartData={this.changeChartData}>
        <div>CAQI</div>
      </Tab>
      <Tab title="PM" changeChartData={this.changeChartData}>
        <div>PM</div>
      </Tab>
    </Tabs>
    { this.state.airlyChartDataForecastChanged ? (this.state.airlyChartDataForecast.isLoaded ?  (this.state.airlyChartDataForecast.type == "line" ? <Line ref="chart" data={this.state.airlyChartDataForecast.data} options={this.state.airlyChartDataForecast.options} redraw/> :  <Bar ref="chart" data={this.state.airlyChartDataForecast.data} options={this.state.airlyChartDataForecast.options} redraw/> ) : <div>Loading...</div>) : (this.state.airlyChartDataForecast.isLoaded ?  (this.state.airlyChartDataForecast.type == "line" ? <Line ref="chart" data={this.state.airlyChartDataForecast.data} options={this.state.airlyChartDataForecast.options} /> :  <Bar ref="chart" data={this.state.airlyChartDataForecast.data} options={this.state.airlyChartDataForecast.options} /> ) : <div>Loading...</div>) }
  </div>

  </div>
  );
}
}
