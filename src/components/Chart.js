import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

export default class LineDemo extends Component {

  state = {
    chartData: {}, 
    isLoaded: false
  }

  buildList = (data) => {

      let historyDataFromAirly = [];
      let datasFromAirly = [];
      let pm25ValuesFromAirly = [];
      let pm10ValuesFromAirly = [];
      let airlyCaqiFromAirly = [];
      
      historyDataFromAirly = data.history;
      {historyDataFromAirly.map((object, i) => datasFromAirly[i] = historyDataFromAirly[i].fromDateTime )}
      {historyDataFromAirly.map((object, i) => pm25ValuesFromAirly[i] = object.values[1].value )}
      {historyDataFromAirly.map((object, i) => pm10ValuesFromAirly[i] = object.values[2].value )}
      {historyDataFromAirly.map((object, i) => airlyCaqiFromAirly[i] = object.indexes[0].value )}

      this.setState({
        chartData: {
          lineChartData: {
              labels: datasFromAirly,
              datasets: [{
                  label: 'PM2.5',
                  borderColor: "#7b7f8e",
                  backgroundColor: "#7b7f8ea6",
                  fill: true,
                  data: pm25ValuesFromAirly,
              }, {
                  label: 'PM10',
                  borderColor: "#999eb1",
                  backgroundColor: "#999eb19c",
                  fill: true,
                  data: pm10ValuesFromAirly,
              }],
          },
          lineChartData2: {
            labels: datasFromAirly,
            datasets: [{
                label: false,
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: airlyCaqiFromAirly,
            }]
          }
         },
         isLoaded: true
      })
}

  componentDidMount() {
    let url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
    fetch(url)
    .then(response => response.json())
    .then(this.buildList)
    .catch()
  }

  render() {
    return (
      <div>
        <h2>Line Example</h2>
        {this.state.isLoaded ?  <Line ref="chart" data={this.state.chartData.lineChartData} /> : <div>Loading...</div>}
      </div>
    );
  }
}
