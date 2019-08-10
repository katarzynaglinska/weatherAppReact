import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const data = {
  /*labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ],*/

    historyDataFromAirly: null,
    pm10ValuesFromAirly: [],
    pm25ValuesFromAirly: [],
    airlyCaqiFromAirly: [],
    datasFromAirly: [],
};

const dataChart = {
    labels: data.datasFromAirly,
    datasets: [{
        label: 'PM2.5',
        borderColor: "#7b7f8e",
        backgroundColor: "#7b7f8ea6",
        fill: true,
        data: data.pm25ValuesFromAirly,
    }, {
        label: 'PM10',
        borderColor: "#999eb1",
        backgroundColor: "#999eb19c",
        fill: true,
        data: data.pm10ValuesFromAirly,
    }],
}



export default class LineDemo extends Component {

  state = {
        list: [],
        error: null,
        dataPm10: data.pm10ValuesFromAirly,
        dataPm25: data.pm25ValuesFromAirly,
        dataChart: {
            labels: data.datasFromAirly,
            datasets: [{
                label: 'PM2.5',
                borderColor: "#7b7f8e",
                backgroundColor: "#7b7f8ea6",
                fill: true,
                data: "",
            }, {
                label: 'PM10',
                borderColor: "#999eb1",
                backgroundColor: "#999eb19c",
                fill: true,
                data: "",
            }],
        }
    }

  buildList = (data) => {
      data.historyDataFromAirly = data.history;
      let pm10ValuesFromAirly = [];
      let pm25ValuesFromAirly = [];
      let airlyCaqiFromAirly = [];
      {data.historyDataFromAirly.map((object, i) => pm10ValuesFromAirly[i] = object.values[2].value )}
      {data.historyDataFromAirly.map((object, i) => pm25ValuesFromAirly[i] = object.values[1].value )}
      {data.historyDataFromAirly.map((object, i) => airlyCaqiFromAirly[i] = object.indexes[0].value )}
      data.pm10ValuesFromAirly = pm10ValuesFromAirly;
      data.pm25ValuesFromAirly = pm25ValuesFromAirly;
      data.airlyCaqiFromAirly = airlyCaqiFromAirly;

  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data

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
        <Line ref="chart" data={dataChart} />
      </div>
    );
  }
}