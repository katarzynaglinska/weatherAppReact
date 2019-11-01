import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import moment from 'moment';
import 'moment/locale/pl';

export class InformationsPg extends Component {
    dataFromPgCurrent = null;
    state = {
        mydate: "",
        day: "",
        dayNameOfWeek: "",
        dayDate: "",
        pm10: "",
        pm25: "",
    };

    componentDidMount() {
        let url =
          "https://smogpg.firebaseio.com/stations.json";
        fetch(url)
          .then(response => response.json())
          .then(this.setCurrentDatePg)
          .catch();
      }

    setCurrentDatePg = res =>{
        this.dataFromPgCurrent = res;

        var mydate = this.convertDate(this.dataFromPgCurrent["Stacja Testowa"].date);
        var day = moment(new Date(mydate), "YYYY-MM-DD HH:mm:ss");   
        var dayNameOfWeek = day.format('dddd').charAt(0).toUpperCase() + day.format('dddd').slice(1);
        var dayDate = day.format('DD-MM-YYYY');
        var pm10 = this.dataFromPgCurrent["Stacja Testowa"].pm10;
        var pm25 = this.dataFromPgCurrent["Stacja Testowa"].pm25;
        this.setState({
            mydate: mydate,
            dayNameOfWeek: dayNameOfWeek,
            dayNameOfWeek: dayNameOfWeek,
            dayDate: dayDate,
            pm10: pm10,
            pm25: pm25,
          });

    }

    convertDate = date => {
        var day = date.substring(0, date.indexOf(' '));
        var month = date.substring(date.indexOf(' ') + 1, date.indexOf(' ') + 4);
        var montfCount = "stylutmarkwimajczelipsiewrzpazlisgru".indexOf(month) / 3 + 1;
        if(montfCount<10){
            montfCount="0"+montfCount;
        }
        var year = date.substring(date.indexOf(' ') + 5, date.indexOf(' ') + 9);
        return year+"-"+montfCount+"-"+day;
    }

    render() {
        return (
           <div>
               <div className="informations__row">
                    <div className="row__title">
                        <span className="name__data">PG</span>{" "}
                        <span className="current-date__day-name">{this.state.dayNameOfWeek}</span>{" "}
                        <span className="current-date__day-date">{this.state.dayDate}</span>
                    </div>
                    <div className="informations__row informations__row--currentpg">
                        <div className="row_name">Pomiary na żywo</div>
                    <div className="row__current row__current--half">
                        <div className="current current_pm10">PM10: <span className="current__value">{this.state.pm10}</span> <span className="current__unit">µg/m³</span></div>
                    </div>
                    <div className="row__current row__current--half">
                        <div className="current current_tem">PM2.5: <span className="current__value">{this.state.pm25}</span> <span className="current__unit">µg/m³</span></div>
                    </div>
                </div>
                </div>
           </div>
        )
    }
}

export default InformationsPg