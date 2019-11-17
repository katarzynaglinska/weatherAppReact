import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [13, 41]
});

export default class MapLeaflet extends Component {
  state = {
    firstCityName: "GDAŃSK",
    firstCityLat: 54.37108,
    firstCityLng: 18.61796,
    secondCityName: "GDYNIA",
    secondCityLat: 54.5196057,
    secondCityLng: 18.53524,
  };

  render() {
    const positionCenter = [52.22966, 18.97295];
    const positionFirstCity = [this.props.firstCityLat, this.props.firstCityLng];
    const positionSecondCity = [this.props.secondCityLat, this.props.secondCityLng];
    return (
      <div>
        <Map center={positionCenter} zoom={5}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={positionFirstCity} icon={customMarker}>
            <Popup>
              {this.props.firstCityName}
            </Popup>
          </Marker>
          <Marker position={positionSecondCity} icon={customMarker}>
            <Popup>
              {this.props.secondCityName}
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}
