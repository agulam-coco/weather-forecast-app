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
    let unit = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${API_KEY}`;

    let success = false;
    fetch(url)
      .then((response) => {
        if (response.ok) success = true;
        return response.json();
      })
      .then((data) => {
        success ? this.parseJson(data) : console.log("place not found");
      })
      .catch((err) => console.error(err, "ERROR CAUGHT"));
  };

  parseJson = (data) => {
    function getDate(date_obj) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      let dayName = days[date_obj.getDay()];
      let dd = String(date_obj.getDate()).padStart(2, "0");
      let mm = months[date_obj.getMonth()];
      let yyyy = date_obj.getFullYear();

      let hh = date_obj.getHours();
      let mn = date_obj.getMinutes();
      let am_pm = hh >= 12 ? "PM" : "AM";

      return `${hh}:${mn} ${am_pm}, ${dayName}, ${mm} ${dd},${yyyy}`;
    }
    //5:05 PM, Mon, Nov 23,2020

    let temperature = data.main.temp + "°C";
    let humidity = data.main.humidity;
    let wind = data.wind;
    let date = new Date();
    date = getDate(date);
    console.log(temperature);
    console.log(date);
  };
}
export default InputField;
