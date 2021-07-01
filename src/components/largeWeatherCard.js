import React, { Component } from "react";
import "./css/largeWeatherCard.css";
import Humidity from "./humidity";
import WindSpeed from "./windspeed";

class LargeWeatherCard extends Component {
  state = {};
  render() {
    return (
      <div className="card">
        <div className="faint">
          <p>5:05 PM, Mon, Nov 23,2020</p>
        </div>
        <div className="flex-row temperature">
          <p>☁️</p>
          <p>72 °F</p>
        </div>
        <div className="flex-row">
          <Humidity />
          <WindSpeed />
        </div>
      </div>
    );
  }
}

export default LargeWeatherCard;
