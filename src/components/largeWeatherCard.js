import React, { Component } from "react";
import "./css/largeWeatherCard.css";
import Humidity from "./humidity";
import WindSpeed from "./windspeed";
import Temperature from "./temperature";

class LargeWeatherCard extends Component {
  state = {};
  render() {
    return (
      <div className="card">
        <div className="faint">
          {/* 5:05 PM, Mon, Nov 23,202 */}
          <p>{this.props.obj.date}</p>
        </div>
        <div className="flex-row temperature">
          <Temperature
            emoji={this.props.obj.emoji}
            temp={this.props.obj.temp}
            tempCName={this.props.tempCName}
          />
        </div>
        <div className="flex-row">
          <Humidity humidity={this.props.obj.humidity} />
          <WindSpeed wind={this.props.obj.wind} />
        </div>
      </div>
    );
  }
}

export default LargeWeatherCard;
