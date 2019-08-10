import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import Tab from './components/Tab'
import Tabs from './components/Tabs'
import Chart from './components/Chart'
import MapContainer from './components/MapContainer'


class App extends React.Component {
render() {
  return (  
    <div>
      <div className="back-image"></div>
      <div className="main">
        <Tabs className="tabs-wrapper">
          <Tab active="true" title="AIRLY">
            <div>AIRLY</div>
          </Tab>
          <Tab title="PG">
            <div>PG</div>
          </Tab>
          <Tab title="PORÓWNANIE">
            <div>PORÓWNANIE</div>
          </Tab>
        </Tabs>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-7 col--no-padding">
                <div className="informations">
                  <Chart/>
                </div>
              </div>
              <div className="col-5 col--no-padding">
                <div className="map">
                  <div id="map">
                    <MapContainer>
                    </MapContainer> 
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
