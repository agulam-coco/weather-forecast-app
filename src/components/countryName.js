import React, { Component } from "react";

import "./css/countryName.css";
import bgImg from "../../src/static/annie-spratt-yI3weKNBRTc-unsplash.jpg";

class CountryName extends Component {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <canvas
          id="country-name-canvas"
          style={{
            backgroundImage: `url("${bgImg}")`,
          }}
        ></canvas>
        <div id="country-name">
          {this.props.name}, {this.props.alphaCode}
        </div>
      </React.Fragment>
    );
  }
}

export default CountryName;
