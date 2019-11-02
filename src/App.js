import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import Chart from "./components/Chart";
import MapContainer from "./components/MapContainer";
import SecondCity from "./components/SecondCity";
import InformationsPg from "./components/InformationsPg";

const BLOCK = {diplay: 'block'}
const NONE= {diplay: 'none'}

class App extends React.Component {
  state = {
    currentView: "airly",
    showViewAirly: true,
    showViewPg: false,
    showViewComparison: false,
    firstCityUrl: "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y",
    secondCityUrl: "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.5196057&lng=18.53524&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y",
    whichCity: "",
    whichCity1: true,
    whichCity2: true,
  };

  //to do : czy można usunac key
  changeMenu = (name, e) => {
    this.setState({
      showViewAirly: false,
      showViewPg: false,
      showViewComparison: false,
    });
    if(name == "airly"){
      this.setState({showViewAirly: true});
    }
    else if(name == "pg"){
      this.setState({showViewPg: true});
    }
    else if(name == "comparison"){
      this.setState({showViewComparison: true});
    }
  }

  changeCity = (e) =>{
    var chosenCity = e.target.value;
    var url = "";
    switch (chosenCity) {
        case '0':
            url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
            break;
        case '1':
            url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.5196057&lng=18.53524&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
            break
        case '2':
            url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=52.22966&lng=20.97295&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
            break;
        case '3':
            url = "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=50.05456&lng=19.942218&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
            break;
        default: break;
    }
    if(e.target.id == "selectFirstCity"){
      this.setState({firstCityUrl: url});
    }
    else{
      this.setState({secondCityUrl: url});
    }
  }


  render() {
    return (
     <div>
      <div className="back-image" />
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
            <div className="container">
              <div className="row">
                <div className="col-7">
                  <div>
                    <div className={this.state.showViewAirly ? 'manu__item manu__item--selected' : 'manu__item'} id="airly" onClick={(e) => this.changeMenu( e.target.id, e)}>AIRLY</div>
                    <div className={this.state.showViewPg ? 'manu__item manu__item--selected' : 'manu__item'} id="pg" onClick={(e) => this.changeMenu( e.target.id, e )}>PG</div>
                    <div className={this.state.showViewComparison ? 'manu__item manu__item--selected' : 'manu__item'} id="comparison" onClick={(e) => this.changeMenu( e.target.id, e )}>PORÓWNANIE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-7 col--no-padding">
                  <div className="informations informations__airly" style={{display: this.state.showViewAirly ? 'block' : 'none' }}>
                    <div class="informations__row">
                        <div class="choose-city">
                            <div class="choose-city__title"><p>Wybierz miasto</p></div>
                            <div class="choose-city__select">
                                <select class="form-control" id="selectFirstCity" onChange={this.changeCity.bind(this)}>
                                    <option value="0">Gdańsk</option>
                                    <option value="1">Gdynia</option>
                                    <option value="2">Warszawa</option>
                                    <option value="3">Kraków</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <Chart url={this.state.firstCityUrl} />
                  </div>
                  <div className="informations informations__second" style={{display: this.state.showViewPg ? 'block' : 'none' }}>
                  <div class="informations__row"> 
                    <div className="choose-city-second">
                        <div className="choose-city__title"><p>Wybierz miasto</p></div>
                        <div className="choose-city__select">
                            <select className="form-control" id="selectSecondCity" onChange={this.changeCity.bind(this)}>
                              <option value="0">Gdańsk</option>
                              <option value="1">Gdynia</option>
                              <option value="2">Warszawa</option>
                              <option value="3">Kraków</option>
                            </select>
                        </div>
                      </div>
                    </div> 
                    <Chart url={this.state.secondCityUrl} />
                  </div>
                  <div className="informations informations__comparison" style={{display: this.state.showViewComparison ? 'block' : 'none' }}>
                   
                  </div>
                </div>
                <div className="col-5 col--no-padding">
                  <div className="map">
                    <div id="map">
                      <MapContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

