import { Component } from "react";
import "./temperature.css";

class Temperature extends Component {
  state = {};
  render() {
    return (
      <div className={this.props.tempCName}>
        <div
          id="icon"
          style={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/weather-icons/svg/${this.props.icon}.svg")`,
          }}
          title="Temperature Icon"
        ></div>
        <p id="description">{this.props.description}</p>
        <p className="flex-column">
          {this.props.temp}
          {<span className="faint"> °C</span>}
        </p>
      </div>
    );
  }
}

export default Temperature;
