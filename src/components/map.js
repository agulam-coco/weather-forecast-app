import { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./css/map.css";

class Map extends Component {
  state = {
    map: null,
    defaultIcon: null,
  };

  componentDidMount() {
    this.initMapData();
  }

  componentDidUpdate() {
    this.handleIt();
  }

  handleIt = () => {
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.state.map);

    // L.tileLayer(
    //   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    //   {
    //     attribution:
    //       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 20,
    //     id: "mapbox/streets-v11",
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken:
    //       "pk.eyJ1IjoiYWd1bGFtIiwiYSI6ImNrcWt2a2ZydTBkMTUyeG40cWFnN3NtNm0ifQ.7yV6k5s2KL2vwJEruQzeBQ",
    //   }
    // ).addTo(this.state.map);

    L.tileLayer(
      "/api/map/{layer}/{z}/{x}/{y}",
      //   "https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={API_KEY}",
      {
        layer: "precipitation_new",
        // API_KEY: "9e52375367807e1d6e79c1720ef928e4",
      }
    ).addTo(this.state.map);

    // this.state.map.fitBounds([[this.props.lat, this.props.lon]],);
    this.state.map.setView([this.props.lat, this.props.lon], 8);
  };

  initMapData() {
    const map = L.map("map");
    // const map = L.map("map").setView([this.props.lat, this.props.lon], 13);

    this.setState({ map: map }, this.handleIt);
  }

  render() {
    return <div id="map"></div>;
  }
}

export default Map;
