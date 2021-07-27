import { Component } from "react";
import "./smallWeatherCard.css";

import Humidity from "../weatherDetails/humidity";
import Temperature from "../temperature/temperature";

class SmallWeatherCard extends Component {
  state = {};
  render() {
    return (
      <div className="flex-column small-card">
        <p className="faint">{this.props.obj.date}</p>
        <Temperature
          description={this.props.obj.description}
          icon={this.props.obj.icon}
          temp={this.props.obj.temp}
          tempCName={this.props.tempCName}
        />
        <Humidity humidity={this.props.obj.humidity} />
      </div>
    );
  }
}

export default SmallWeatherCard;
