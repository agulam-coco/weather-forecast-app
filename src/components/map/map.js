import { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./map.css";

class Map extends Component {
  state = {
    map: null,
    defaultIcon: null,
  };

  componentDidMount() {
    this.initMapData();
  }

  componentDidUpdate() {
    this.handleMapUpdate();
  }

  handleMapUpdate = () => {
    //open street map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.state.map);

    //temperature layer from backend
    L.tileLayer("/api/map/{layer}/{z}/{x}/{y}", {
      layer: "temp_new",
    }).addTo(this.state.map);

    // this.state.map.fitBounds([[this.props.lat, this.props.lon]],);
    this.state.map.setView([this.props.lat, this.props.lon], 4);
  };

  initMapData() {
    //get color for a specific integer
    function getColor(int) {
      return int > 30
        ? "rgba(252, 128, 20, 1)"
        : int > 25
        ? "rgba(255, 194, 40,1)"
        : int > 20
        ? "rgba(255, 240, 40, 1)"
        : int > 10
        ? "rgba(194, 255, 40, 1)"
        : int > 0
        ? "rgba(32, 140, 236, 1)"
        : int > -10
        ? "rgba(32, 196, 232, 1)"
        : int > -20
        ? "rgba(32, 140, 236, 1)"
        : int > -30
        ? "rgba(130, 87, 219, 1)"
        : "rgba(130, 22, 146, 1)";
    }

    //set map variable
    const map = L.map("map");

    //Info for map
    let info = L.control();
    info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info flex-row");
      this._div.innerHTML = `<img src="weather-icons/svg/012-farenheit.svg" alt="Temperature icon"/> <h4>Temperature Map</h4>`; // create a div with a class "info"
      return this._div;
    };
    info.addTo(map);

    //Map legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = (map) => {
      let div = L.DomUtil.create("div", "info legend"),
        grades = [-40, -30, -20, -10, 0, 10, 20, 25, 30];

      // loop through our temperature intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(grades[i] + 1) +
          '"></i> ' +
          "<span >" +
          grades[i] +
          (grades[i + 1] + 1 ? "</span><br>" : "+</span>");
      }

      return div;
    };
    legend.addTo(map);

    //add map to state
    this.setState({ map: map }, this.handleMapUpdate);
  }

  render() {
    return <div id="map"></div>;
  }
}

export default Map;
