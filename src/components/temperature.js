import React, { Component } from "react";
import "./css/temperature.css";

class Temperature extends Component {
  state = {};
  render() {
    return (
      <div className={this.props.tempCName}>
        <p id="emoji">{this.props.emoji}</p>
        <p>{this.props.temp}</p>
      </div>
    );
  }
}

export default Temperature;
