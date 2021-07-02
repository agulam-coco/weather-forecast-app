import React, { Component } from "react";
import "./App.css";

import InputField from "./components/inputField";
import LargeWeatherCard from "./components/largeWeatherCard";
import SmallWeatherCard from "./components/smallWeatherCard";
import CountryName from "./components/countryName";

class App extends Component {
  state = {
    smallWeatherClassName: " temperature-sm flex-column-reverse",
    smallWeatherCards: [
      { id: 1, emoji: "☀️", date: "--- --", humidity: "-- %", temp: "-- °C" },
      { id: 2, emoji: "🌧", date: "--- --", humidity: "-- %", temp: "-- °C" },
      { id: 3, emoji: "☁️", date: "--- --", humidity: "-- %", temp: "-- °C" },
      { id: 4, emoji: "⛅", date: "--- --", humidity: "-- %", temp: "-- °C" },
      { id: 5, emoji: "⛈", date: "--- --", humidity: "-- %", temp: "-- °C" },
    ],

    largeWeatherCard: {
      tempCName: "flex-column temperature-lg",
      humidity: "-- %",
      wind: "-- km/j",
      temp: "-- °C",
      date: "---- --,---, --- --,----",
      emoji: "☁️",
    },

    country: {
      name: "-----",
      alphaCode: "--",
    },
  };

  async componentDidMount() {}

  setMapBackground = () => {
    let countryNameChart = document.getElementById("country-name-canvas");
    let height = countryNameChart.offsetHeight;
    let width = countryNameChart.offsetWidth;

    let src = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-0.2257,5.5645,5,0/${width}x${height}?access_token=pk.eyJ1IjoiYWd1bGFtIiwiYSI6ImNrcWt2a2ZydTBkMTUyeG40cWFnN3NtNm0ifQ.7yV6k5s2KL2vwJEruQzeBQ`;

    let img = new Image();
    img.onload = function () {
      countryNameChart.style.backgroundImage = `url("${src}")`;
      countryNameChart.style.filter = "blur(8px)";
    };

    img.src = src;
  };

  render() {
    return (
      <div className="main-weather-container" id="main-weather-container">
        <div className="flex-column margin-lg" style={{ marginTop: "0px" }}>
          <InputField />
          <LargeWeatherCard
            obj={this.state.largeWeatherCard}
            tempCName={this.state.largeWeatherCard.tempCName}
          />
        </div>
        <div className="flex-column margin-lg">
          <div className="flex-row">
            {this.state.smallWeatherCards.map((weatherCard) => (
              <SmallWeatherCard
                key={weatherCard.id}
                obj={weatherCard}
                tempCName={this.state.smallWeatherClassName}
              />
            ))}
          </div>
          <div className="flex-column countryname-container">
            <CountryName
              name={this.state.country.name}
              alphaCode={this.state.country.alphaCode}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
