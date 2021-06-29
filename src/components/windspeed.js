import React, { Component } from "react";
import "./css/weatherDetail.css";

class WindSpeed extends Component {
  state = {};
  render() {
    return (
      <div className="weather-detail">
        <p className="faint">Wind speed</p>
        <p>19.2 km/j</p>
      </div>
    );
  }
}

export default WindSpeed;
