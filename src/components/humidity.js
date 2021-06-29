import React, { Component } from "react";
import "./css/weatherDetail.css";

class Humidity extends Component {
  state = {};
  render() {
    return (
      <div className="weather-detail">
        <p className="faint">Humidity</p>
        <p className="">45%</p>
      </div>
    );
  }
}

export default Humidity;
