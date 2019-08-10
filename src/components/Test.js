
import React from 'react';
import '../App.scss';

class Test extends React.Component {
    render() {
        return (
            <div>
                <div className="back-image"></div>

                <div className="main">
    <div className="title">
        <div className="container">
                <div className="row">
                    <div className="col-12">
                    <a className="title__top">Zanieczyszczenie powietrza </a>
                    <br/>
                    <a className="title__bottom">Wskaźnik jakości powietrza w czasie rzeczywistym </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="menu">
                <div className="container" /*style="padding: 0px;"*/>
                        <div className="row">
                            <div className="col-7" /*style="padding-right: 0px;">
                                <div className="manu__item manu__item--selected" style="margin-left: 0px;"*/>AIRLY</div>
                                <div className="manu__item">PG</div>
                                <div className="manu__item">PORÓWNANIE</div>
                             </div>
                             <div className="col-5">
                                    <div className="manu__item manu__item--notification">WŁĄCZ POWIADOMIENIE</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
  <div className="container">
      <div className="row">
          <div className="col-7 col--no-padding">
              <div className="informations">
                  <div className="informations__row">
                      <div className="row__title"><span className="name__data">AIRLY</span> <span className="current_date">Poniedziałek 22.04</span></div>
                  </div>
                  <div className="separator"></div>
                  <div className="informations__row informations__row--rate">
                      <div className="row__rate-number">8</div>
                      <div className="row__rate">Dobra jakość powietrza</div>
                  </div>
                  <div className="separator"></div>
                  <div className="informations__row informations__row--current">
                          <div className="row_name">Pomiary na żywo</div>
                      <div className="row__current row__current--half">
                          <div className="current current_pm10">PM10: <span className="current__value">6</span> <span className="current__unit">µg/m³</span></div>
                          <div className="current current_pm25">PM2.5: <span className="current__value">4</span> <span className="current__unit">µg/m³</span></div>
                          <div className="current current_pm1">PM1: <span className="current__value">3</span> <span className="current__unit">µg/m³</span></div>
                      </div>
                      <div className="row__current row__current--half">
                          <div className="current current_tem">TEMPERATURA: <span className="current__value">15</span> <span className="current__unit">°C</span></div>
                          <div className="current current_pres">CIŚNIENIE: <span className="current__value">1012</span> <span className="current__unit">hPa</span></div>
                          <div className="current current_hum">WILGOTNOŚĆ: <span className="current__value">81</span> <span className="current__unit">%</span></div>
                      </div>
                  </div>
                  <div className="informations__row">
                      <div className="row_name">Dane historyczne</div>
                      <div className="row__menu-historic">
                          <div className="menu-historic__item">CAQI</div>
                          <div className="menu-historic__item menu-historic__item--selected">PM</div>
                          <div className="menu-historic__item">TEMPERATURA</div>
                      </div>
                      <div className="row__historic ">
                          <canvas className="historic__graph" id="graphAirlyHistoric"></canvas>
                      </div>
                  </div>
                  <div className="informations__row">
                      <div className="row_name">Prognoza na nastepne dni</div>
                      <div className="row__menu-historic">
                          <div className="menu-historic__item menu-historic__item--selected">CAQI</div>
                          <div className="menu-historic__item ">PM</div>
                          <div className="menu-historic__item">TEMPERATURA</div>
                      </div>
                      <div className="row__prediction ">
                          <canvas className="prediction__graph" id="graphAirlyPrediction"></canvas>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-5 col--no-padding">
              <div className="map">
                  <div id="map"></div>
              </div>
          </div>
      </div>
  </div>
</div>



            </div>
        )
    }
  }
  
  
  export default Test;






