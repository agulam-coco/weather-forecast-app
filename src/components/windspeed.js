import React, { Component } from "react";
import "./css/weatherDetail.css";

class WindSpeed extends Component {
  state = {};
  render() {
    return (
      <div className="weather-detail">
        <p className="faint">Wind speed</p>
        <p>{this.props.wind}</p>
      </div>
    );
  }
}

export default WindSpeed;
