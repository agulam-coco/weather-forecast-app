import React, { Component } from "react";
import "./App.css";

import InputField from "./components/inputField";
import LargeWeatherCard from "./components/largeWeatherCard";
import SmallWeatherCard from "./components/smallWeatherCard";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="main-weather-container">
        <div className="flex-column margin-lg">
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
          <div
            style={{
              fontSize: "40px",
              marginTop: "40px",
              padding: "100px auto auto",
            }}
          >
            <b>TODO</b>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
