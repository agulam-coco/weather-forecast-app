import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { Component } from "react";
import "./css/weatherChart.css";
import * as config from "../config/weatherChartConfig";

Chart.register(...registerables);

class WeatherChart extends Component {
  componentDidMount() {
    let ctx = document.getElementById("weather-chart").getContext("2d");

    let temp = mappedObjectFromArray(
        this.props.hourly.date,
        this.props.hourly.temp
      ),
      feelsLike = mappedObjectFromArray(
        this.props.hourly.date,
        this.props.hourly.feelsLike
      );

    let chart = new Chart(ctx, {
      type: config.config.type,
      options: config.config.options,
      data: {
        datasets: [
          {
            label: config.tempLabel,
            backgroundColor: config.temperatureBackground,
            borderColor: config.temperatureBorder,
            pointBackgroundColor: config.temperatureBorder,
            data: temp,
            
          },
          {
            label: config.feelsLikeLabel,
            backgroundColor: config.feelsLikeBackground,
            borderColor: config.feelsLikeBorder,
            pointBackgroundColor: config.feelsLikeBorder,
            data: feelsLike,
          },
        ],
      },
    });

    //add chart to state
    this.setState({ chart: chart });
  }

  componentDidUpdate() {
    //chart instance
    let chart = this.state.chart;

    // create data objects
    let temp = mappedObjectFromArray(
        this.props.hourly.date,
        this.props.hourly.temp
      ),
      feelsLike = mappedObjectFromArray(
        this.props.hourly.date,
        this.props.hourly.feelsLike
      );

    //set temperature data
    chart.data.datasets[0].data = temp;

    //set feels like temperature
    chart.data.datasets[1].data = feelsLike;

    chart.update();
  }
  render() {
    return (
      <div className="weather-chart-wrapper">
        <canvas id="weather-chart" height="150"></canvas>
      </div>
    );
  }
}

function mappedObjectFromArray(xArray, yArray) {
  return yArray.map(function (value, index) {
    return { x: xArray[index], y: value };
  });
}

export default WeatherChart;
