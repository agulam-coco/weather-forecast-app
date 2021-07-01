import React, { Component } from "react";
import "./App.css";

import InputField from "./components/inputField";
import LargeWeatherCard from "./components/largeWeatherCard";
import SmallWeatherCard from "./components/smallWeatherCard";
import CountryName from "./components/countryName";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="main-weather-container" id="main-weather-container">
        <div className="flex-column margin-lg" style={{ marginTop: "0px" }}>
          <InputField />
          <LargeWeatherCard />
        </div>
        <div className="flex-column margin-lg">
          <div className="flex-row">
            <SmallWeatherCard emoji="☀️" />
            <SmallWeatherCard emoji="🌧" />
            <SmallWeatherCard emoji="☁️" />
            <SmallWeatherCard emoji="⛅" />
            <SmallWeatherCard emoji="⛈" />
          </div>
          <div className="flex-column countryname-container">
            <CountryName />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
