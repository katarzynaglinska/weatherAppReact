import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import Chart from "./components/Chart";
import MapContainer from "./components/MapContainer";
import InformationsPg from "./components/InformationsPg";

const BLOCK = {diplay: 'block'}
const NONE= {diplay: 'none'}

class App extends React.Component {
  state = {
    currentView: "airly",
    showViewAirly: true,
    showViewPg: false,
    showViewComparison: false,
  };

  //to do : czy można usunac key
  changeMenu = (name) => {
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



  render() {
    return (
      <div>
        <div className="back-image" />
        <div className="main">

        <div className="menu">
            <div className="container">
              <div className="row">
                <div className="col-7">
                  <div>
                    <div className="manu__item" id="airly" onClick={(e) => this.changeMenu( e.target.id )}>AIRLY</div>
                    <div className="manu__item" id="pg" onClick={(e) => this.changeMenu( e.target.id )}>PG</div>
                    <div className="manu__item" id="comparison" onClick={(e) => this.changeMenu( e.target.id )}>PORÓWNANIE</div>
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
                    <Chart/>
                  </div>
                  <div className="informations informations__pg" style={{display: this.state.showViewPg ? 'block' : 'none' }}>
                    <InformationsPg/>
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






/*import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import Tab from "./components/Tab";
import TabsMenu from "./components/TabsMenu";
import Chart from "./components/Chart";
import MapContainer from "./components/MapContainer";
import InformationsPg from "./components/InformationsPg";

const BLOCK = {diplay: 'block'}
const NONE= {diplay: 'none'}

class App extends React.Component {
  state = {
    currentView: "airly",
    showViewAirly: true,
    showViewPg: false,
    showViewComparison: false,
  };

  //to do : czy można usunac key
  changeMenu = (key, name) => {
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


  render() {
    return (
      <div>
        <div className="back-image" />
        <div className="main">
          <TabsMenu className="tabs-wrapper" tabTitle="mainMenu">
            <Tab active="true" title="AIRLY" name="airly" changeMenu={this.changeMenu}>
              <div>AIRLY</div>
            </Tab>
            <Tab title="PG" name="pg" changeMenu={this.changeMenu}>
              <div>PG</div>
            </Tab>
            <Tab title="PORÓWNANIE" name="comparison" changeMenu={this.changeMenu}>
              <div>PORÓWNANIE</div>
            </Tab>
          </TabsMenu>
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-7 col--no-padding">
                  <div className="informations informations__airly" style={{display: this.state.showViewAirly ? 'block' : 'none' }}>
                    <Chart/>
                  </div>
                  <div className="informations informations__pg" style={{display: this.state.showViewPg ? 'block' : 'none' }}>
                    <InformationsPg/>
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

export default App;*/


