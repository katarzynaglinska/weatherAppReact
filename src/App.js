import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import Map from "./components/Map";
import Comparison from "./components/Comparison";
import InformationsCity from "./components/InformationsCity";

const BLOCK = { diplay: "block" };
const NONE = { diplay: "none" };

class App extends React.Component {
  state = {
    currentView: "firstCityTab",
    showViewFirstCity: true,
    showViewSecondCity: false,
    showViewComparison: false,
    firstCityUrl:
      "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y",
    secondCityUrl:
      "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.5196057&lng=18.53524&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y",
    firstCityName: "GDAŃSK",
    firstCityLat: 54.37108,
    firstCityLng: 18.61796,
    secondCityName: "GDYNIA",
    secondCityLat: 54.5196057,
    secondCityLng: 18.53524
  };

  changeMenu = (name, e) => {
    this.setState({
      showViewFirstCity: false,
      showViewSecondCity: false,
      showViewComparison: false
    });
    if (name == "firstCityTab") {
      this.setState({ showViewFirstCity: true });
    } else if (name == "secondCityTab") {
      this.setState({ showViewSecondCity: true });
    } else if (name == "comparison") {
      this.setState({ showViewComparison: true });
    }
  };

  changeCity = (e, cityType) => {
    var chosenCity = e.target.value;
    var url = "";
    var cityInformations = [];
    if (cityType == "firstCity") {
      cityInformations = this.getCityInformations(chosenCity);
      this.setState({
        firstCityLat: cityInformations[0],
        firstCityLng: cityInformations[1],
        firstCityName: cityInformations[2]
      });
    } else {
      cityInformations = this.getCityInformations(chosenCity);
      this.setState({
        secondCityLat: cityInformations[0],
        secondCityLng: cityInformations[1],
        secondCityName: cityInformations[2]
      });
    }
    switch (chosenCity) {
      case "0":
        url =
          "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.37108&lng=18.61796&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
        break;
      case "1":
        url =
          "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=54.5196057&lng=18.53524&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
        break;
      case "2":
        url =
          "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=52.22966&lng=20.97295&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
        break;
      case "3":
        url =
          "https://airapi.airly.eu/v2/measurements/nearest?indexType=AIRLY_CAQI&lat=50.05456&lng=19.942218&maxDistanceKM=1&apikey=91IYoXFWJTxEuGLBOVr60JyFMvSSGN1y";
        break;
      default:
        break;
    }
    if (e.target.id == "selectFirstCity") {
      this.setState({ firstCityUrl: url });
    } else {
      this.setState({ secondCityUrl: url });
    }
  };

  getCityInformations = cityType => {
    var informations = [];
    switch (cityType) {
      case "0":
        informations[0] = 54.37108;
        informations[1] = 18.61796;
        informations[2] = "GDAŃSK";
        break;
      case "1":
        informations[0] = 54.5196057;
        informations[1] = 18.53524;
        informations[2] = "GDYNIA";
        break;
      case "2":
        informations[0] = 52.22966;
        informations[1] = 20.97295;
        informations[2] = "WARSZAWA";
        break;
      case "3":
        informations[0] = 50.05456;
        informations[1] = 19.942218;
        informations[2] = "KRAKÓW";
        break;
      default:
        break;
    }
    return informations;
  };

  componentDidMount() {
    document.getElementById("selectSecondCity").value = 1;
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
                  <br />
                  <a className="title__bottom">
                    Wskaźnik jakości powietrza w czasie rzeczywistym{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="menu">
            <div className="container">
              <div className="row">
                <div className="col-7 col-7--no-padding">
                  <div>
                    <div
                      className={
                        this.state.showViewFirstCity
                          ? "manu__item manu__item--first manu__item--selected"
                          : "manu__item"
                      }
                      id="firstCityTab"
                      onClick={e => this.changeMenu(e.target.id, e)}
                    >
                      {this.state.firstCityName}
                    </div>
                    <div
                      className={
                        this.state.showViewSecondCity
                          ? "manu__item manu__item--selected"
                          : "manu__item"
                      }
                      id="secondCityTab"
                      onClick={e => this.changeMenu(e.target.id, e)}
                    >
                      {this.state.secondCityName}
                    </div>
                    <div
                      className={
                        this.state.showViewComparison
                          ? "manu__item manu__item--selected"
                          : "manu__item"
                      }
                      id="comparison"
                      onClick={e => this.changeMenu(e.target.id, e)}
                    >
                      PORÓWNANIE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-7 col--no-padding">
                  <div
                    className="informations informations__first"
                    style={{
                      display: this.state.showViewFirstCity ? "block" : "none"
                    }}
                  >
                    <div class="informations__row">
                      <div class="choose-city">
                        <div class="choose-city__title">
                          <p>Wybierz miasto</p>
                        </div>
                        <div class="choose-city__select">
                          <select
                            class="form-control"
                            id="selectFirstCity"
                            onChange={e => this.changeCity(e, "firstCity")}
                          >
                            <option value="0">Gdańsk</option>
                            <option value="1">Gdynia</option>
                            <option value="2">Warszawa</option>
                            <option value="3">Kraków</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="separator"></div>
                    <InformationsCity
                      url={this.state.firstCityUrl}
                      firstCity={this.state.firstCityName}
                      secondCity={this.state.secondCity}
                    />
                  </div>
                  <div
                    className="informations informations__second"
                    style={{
                      display: this.state.showViewSecondCity ? "block" : "none"
                    }}
                  >
                    <div class="informations__row">
                      <div className="choose-city-second">
                        <div className="choose-city__title">
                          <p>Wybierz miasto</p>
                        </div>
                        <div className="choose-city__select">
                          <select
                            className="form-control"
                            id="selectSecondCity"
                            onChange={e => this.changeCity(e, "secondCity")}
                          >
                            <option value="0">Gdańsk</option>
                            <option value="1">Gdynia</option>
                            <option value="2">Warszawa</option>
                            <option value="3">Kraków</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <InformationsCity
                      url={this.state.secondCityUrl}
                      firstCity={this.state.firstCityName}
                      secondCity={this.state.secondCity}
                    />
                  </div>
                  <div
                    className="informations informations__comparison"
                    style={{
                      display: this.state.showViewComparison ? "block" : "none"
                    }}
                  >
                    <Comparison
                      firstCityUrl={this.state.firstCityUrl}
                      secondCityUrl={this.state.secondCityUrl}
                      firstCity={this.state.firstCityName}
                      secondCity={this.state.secondCityName}
                    />
                  </div>
                </div>
                <div className="col-5 col--no-padding">
                  <div className="map">
                    <div id="mapid">
                      <Map
                        firstCityLat={this.state.firstCityLat}
                        firstCityLng={this.state.firstCityLng}
                        firstCityName={this.state.firstCityName}
                        secondCityLat={this.state.secondCityLat}
                        secondCityLng={this.state.secondCityLng}
                        secondCityName={this.state.secondCityName}
                      />
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
