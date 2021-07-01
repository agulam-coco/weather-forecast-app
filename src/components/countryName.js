import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import "./css/countryName.css";
import bgImg from "../../src/static/annie-spratt-yI3weKNBRTc-unsplash.jpg";

class CountryName extends Component {
  state = {
    data: {
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          label: "COUNTRY",
          data: [],
          fill: false,
        },
      ],
    },
  };

  setChartImage = () => {
    setTimeout(function () {
      let countryNameChart = document.getElementById("country-name-chart");
      let height = countryNameChart.offsetHeight;
      let width = countryNameChart.offsetWidth;

      let src = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-0.2257,5.5645,5,0/${width}x${height}?access_token=pk.eyJ1IjoiYWd1bGFtIiwiYSI6ImNrcWt2a2ZydTBkMTUyeG40cWFnN3NtNm0ifQ.7yV6k5s2KL2vwJEruQzeBQ`;

      let img = new Image();
      img.onload = function () {
        countryNameChart.style.backgroundImage = `url("${src}")`;
        countryNameChart.style.filter = "blur(8px)";
      };

      img.src = src;
    }, 500);
  };

  render() {
    this.setChartImage();
    return (
      <React.Fragment>
        <Line
          data={this.state.data}
          id="country-name-chart"
          style={{
            backgroundImage: `url("${bgImg}")`,
            filter: "blur(8px)",
            transition: "background-image 2s ease-in-out",
          }}
        />
        <div id="country-name">Accra, GH</div>
      </React.Fragment>
    );
  }
}

export default CountryName;
