import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { Component } from "react";
import "./weatherChart.css";
import * as config from "../../config/weatherChartConfig";

//register chart imports
Chart.register(...registerables);

class WeatherChart extends Component {
  componentDidMount() {
    //set default values
    Chart.defaults.font.family = "'Quicksand'";
    Chart.defaults.font.size = 13;

    //select canvas
    let ctx = document.getElementById(this.props.id).getContext("2d");

    //create new chart obj
    let chart = new Chart(ctx, {
      type: config.config.type,
      options: {},
    });

    //set celcius data
    if (!this.props.humidity) {
      chart.data = config.config.data1;
      chart.options = config.config.options1;
    }
    //set humidity data
    else {
      chart.data = config.config.data2;
      chart.options = config.config.options2;
    }

    //add chart to state
    this.setState({ chart: chart });
  }

  componentDidUpdate() {
    //chart instance
    let chart = this.state.chart;

    //set celcius data
    if (!this.props.humidity) {
      // create data objects
      let temp = mappedObjectFromArray(
          this.props.obj.date,
          this.props.obj.temp
        ),
        feelsLike = mappedObjectFromArray(
          this.props.obj.date,
          this.props.obj.feelsLike
        );

      //set temperature data
      chart.data.datasets[0].data = temp;

      //set feels like temperature
      chart.data.datasets[1].data = feelsLike;
    }
    //humidity data
    else {
      let humidity = mappedObjectFromArray(
        this.props.obj.date,
        this.props.obj.humidity
      );

      //set humidity data
      chart.data.datasets[0].data = humidity;
    }

    chart.update();
  }

  render() {
    return (
      <div className="weather-chart-wrapper">
        <canvas id={this.props.id} height="150"></canvas>
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
