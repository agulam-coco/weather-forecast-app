import React, { Component } from "react";
import "./css/smallWeatherCard.css";

import Humidity from "./humidity";

class SmallWeatherCard extends Component {
  state = {};
  render() {
    return (
      <div className="flex-column small-card faint ">
        <p>Today</p>
        <p className="weather-emoji">{this.props.emoji}</p>
        <Humidity />
      </div>
    );
  }
}

export default SmallWeatherCard;
