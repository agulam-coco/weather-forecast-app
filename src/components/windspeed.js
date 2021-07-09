import { Component } from "react";
import "./css/weatherDetail.css";

class WindSpeed extends Component {
  state = {};
  render() {
    return (
      <div className="weather-detail">
        <p className="faint">Wind speed</p>
        <p>{this.props.wind + " m/s"}</p>
      </div>
    );
  }
}

export default WindSpeed;
