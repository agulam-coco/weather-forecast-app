import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { Component } from "react";
import "./css/weatherChart.css";
import * as config from "../config/weatherChartConfig";

Chart.register(...registerables);

class WeatherChart extends Component {
  componentDidMount() {
    //select canvas and create new chart obj
    let ctx = document.getElementById(this.props.id).getContext("2d");
    let chart = new Chart(ctx, {
      type: config.config.type,
      options: config.config.options,
    });

    let data = {};

    // //set celcius data
    if (!this.props.humidity) {
      data = {
        datasets: [
          {
            label: config.tempLabel,
            backgroundColor: config.temperatureBackground,
            borderColor: config.temperatureBorder,
            pointBackgroundColor: config.temperatureBorder,
          },
          {
            label: config.feelsLikeLabel,
            backgroundColor: config.feelsLikeBackground,
            borderColor: config.feelsLikeBorder,
            pointBackgroundColor: config.feelsLikeBorder,
          },
        ],
      };

      //set options for celcius y axis
      chart.options.scales["y"].title.color = config.celciusColor;
      chart.options.scales["y"].ticks.color = config.celciusColor;
      chart.options.scales["y"].title.text = config.celciusTitle;
    }
    //set humidity data
    else {
      data = {
        datasets: [
          {
            label: config.humidityLabel,
            backgroundColor: config.humidityBackground,
            borderColor: config.humidityBorder,
            pointBackgroundColor: config.humidityBorder,
          },
        ],
      };

      //set y axis for humidity y axis
      chart.options.scales["y"].title.color = config.humidityBorder;
      chart.options.scales["y"].ticks.color = config.humidityBorder;
      chart.options.scales["y"].title.text = config.percentTitle;
    }

    //add data to chart object
    chart.data = data;

    //set default values
    Chart.defaults.font.family = "'Quicksand'";
    Chart.defaults.font.size = 13;

    //add chart to state
    this.setState({ chart: chart });
  }

  componentDidUpdate() {
    //chart instance
    let chart = this.state.chart;

    //set ticks for x axis
    chart.options.scales["x"].ticks.callback = (val, index) => {
      //get the index of the tick and generate the day from it
      let timestamp = this.props.obj.date[index];

      //set the tick to the day of the week every 24 hours
      return index % 24 === 0 ? this.formatDate(timestamp) : val;
    };
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

  formatDate(int) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let obj = new Date(int);
    return days[obj.getDay()];
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
