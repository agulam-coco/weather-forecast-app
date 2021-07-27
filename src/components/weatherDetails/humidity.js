import { Component } from "react";
import "./weatherDetail.css";

class Humidity extends Component {
  state = {};
  render() {
    return (
      <div className="weather-detail">
        <p className="faint">Humidity</p>
        <p>{this.props.humidity + " %"}</p>
      </div>
    );
  }
}

export default Humidity;
