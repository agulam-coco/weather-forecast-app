import react from "react";
import React, { Component } from "react";
import "./css/inputField.css";

import "./scripts/weather.js";

class InputField extends Component {
  render() {
    return (
      <div className="flex-column">
        <i className="fas fa-search"></i>
        <input
          type="text"
          id="input-field"
          name="input-field"
          className="thin-border"
        />
        <div className="flex-column">
          <button
            className="search-button thin-border"
            id="search-button"
            onClick={this.verifyInput}
          >
            Search
          </button>
        </div>
      </div>
    );
  }

  verifyInput = () => {
    let userCountry = document.getElementById("input-field").value;

    if (userCountry.trim()) {
      this.fetchWeatherInfo(userCountry.replace(" ", ","));
    }
  };

  fetchWeatherInfo = (query) => {
    const API_KEY = "9e52375367807e1d6e79c1720ef928e4";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`;

    let success;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          console.log("SUCCESS");
          success = true;
        } else {
          console.log("err");
          success = false;
        }
      })
      .then((data) => {
        success ? console.log(data) : console.log("An error occured");
      })
      .catch((error) => console.log(error));
  };
}
export default InputField;
