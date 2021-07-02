import React, { Component } from "react";
import "./css/smallWeatherCard.css";

import Humidity from "./humidity";
import Temperature from "./temperature";

class SmallWeatherCard extends Component {
  state = {};
  render() {
    return (
      <div className="flex-column small-card faint ">
        <p>{this.props.obj.date}</p>
        <Temperature
          emoji={this.props.obj.emoji}
          temp={this.props.obj.temp}
          tempCName={this.props.tempCName}
        />
        <Humidity humidity={this.props.obj.humidity} />
      </div>
    );
  }
}

export default SmallWeatherCard;
