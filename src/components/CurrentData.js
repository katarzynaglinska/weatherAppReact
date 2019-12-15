import React, { Component } from "react";

export class CurrentData extends Component {
  render() {
    return (
      <div>
        <div className="informations__row">
          <div className="row__title">
            <span className="name__data">AIRLY</span>{" "}
            <span className="current-date__day-name">
              {this.props.dayNameOfWeek}
            </span>{" "}
            <span className="current-date__day-date">{this.props.dayDate}</span>
          </div>
        </div>
        <div className="separator"></div>
        <div className="informations__row informations__row--rate">
          <div className="row__rate-number">{this.props.rateValue}</div>
          <div className="row__rate">{this.props.rate}</div>
        </div>
        <div className="separator"></div>
        <div className="informations__row informations__row--current">
          <div className="row_name">Pomiary na żywo</div>
          <div className="row__current row__current--half">
            <div className="current current_pm10">
              PM10: <span className="current__value">{this.props.pm10}</span>
              <span className="current__unit">µg/m³</span>
            </div>
            <div className="current current_pm25">
              PM2.5: <span className="current__value">{this.props.pm25}</span>{" "}
              <span className="current__unit">µg/m³</span>
            </div>
            <div className="current current_pm1">
              PM1: <span className="current__value">{this.props.pm1}</span>{" "}
              <span className="current__unit">µg/m³</span>
            </div>
          </div>
          <div className="row__current row__current--half">
            <div className="current current_tem">
              TEMPERATURA:{" "}
              <span className="current__value">{this.props.temperature}</span>{" "}
              <span className="current__unit">°C</span>
            </div>
            <div className="current current_pres">
              CIŚNIENIE:{" "}
              <span className="current__value">{this.props.pressure}</span>{" "}
              <span className="current__unit">hPa</span>
            </div>
            <div className="current current_hum">
              WILGOTNOŚĆ:{" "}
              <span className="current__value">{this.props.humidity}</span>{" "}
              <span className="current__unit">%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentData;
