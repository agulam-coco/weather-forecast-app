import React, { Component } from "react";
import "./App.css";

import InputField from "./components/inputField";
import LargeWeatherCard from "./components/largeWeatherCard";
import SmallWeatherCard from "./components/smallWeatherCard";
import CountryName from "./components/countryName";

const API_KEY = `${process.env.REACT_APP_WEATHER_API_KEY}`;
const UNITS = "metric";

class App extends Component {
  state = {
    lonLat: {},
    smallWeatherClassName: " temperature-sm flex-column-reverse",
    smallWeatherCards: [
      {
        id: 1,
        icon: "01n",
        date: "--- --",
        humidity: "--",
        temp: "--",
      },
      {
        id: 2,
        icon: "09",
        date: "--- --",
        humidity: "--",
        temp: "--",
      },
      {
        id: 3,
        icon: "03",
        date: "--- --",
        humidity: "--",
        temp: "--",
      },
      {
        id: 4,
        icon: "02n",
        date: "--- --",
        humidity: "--",
        temp: "--",
      },
      {
        id: 5,
        icon: "11",
        date: "--- --",
        humidity: "--",
        temp: "--",
      },
    ],

    largeWeatherCard: {
      tempCName: "flex-column temperature-lg",
      humidity: "--",
      wind: "--",
      temp: "-- ",
      date: "---- --,---, --- --,----",
      icon: "01n",
    },

    country: {
      name: "-----",
      alphaCode: "--",
    },
  };

  componentDidMount() {
    this.getUserLocation();
  }

  getUserLocation = () => {
    //get user locatoin
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getLonLat,
        this.setDefaultCountry
      );
    } else {
      console.error("User location not supported");
      this.setDefaultCountry();
    }
  };

  setDefaultCountry = () => {
    const defaultName = "London, UK";
    document.getElementById("input-field").value = defaultName;

    this.fetchDefaultData();
  };

  fetchDefaultData = () => {
    document.getElementById("search-button").click();
  };

  verifyInput = () => {
    let userCountry = document.getElementById("input-field").value;

    if (userCountry.trim()) {
      let query = userCountry.replace(", ", ",").replace(" ", ",");

      this.fetchWeatherInfo(query)
        .then((data) => {
          if (data) {
            this.parseJson(data);
            this.setLonLatState(data);
            this.fetchsmallWeatherInfo();
            this.setMapBackground();
          } else {
            console.error("Invalid");
          }
        })
        .catch((error) => console.error("Network error caught"));
    }
  };

  setLonLatState = (data) => {
    //set long and lat data
    this.setState({
      lonLat: { lon: data.coord.lon, lat: data.coord.lat },
    });
  };
  //fetch small card weather info
  fetchsmallWeatherInfo = () => {
    this.fetchWeatherInfo(null, null, true)
      .then((data) => {
        data ? this.parseJson5Days(data) : console.error("Invalid 2");
      })
      .catch((error) => console.error("Network error 5 days", error));
  };

  getLonLat = (lonLatGeoLocation) => {
    let lonLat = {
      lon: lonLatGeoLocation.coords.longitude,
      lat: lonLatGeoLocation.coords.latitude,
    };

    this.fetchWeatherInfo(null, lonLat)
      .then((data) => {
        if (data) {
          this.parseJson(data);
          this.setLonLatState(data);
          this.fetchsmallWeatherInfo();
          this.setMapBackground();
        } else {
          console.error("Invalid 3");
        }
      })
      .catch((error) => console.error("Network error lon Lat", error));
  };

  fetchWeatherInfo = async (query = null, lonLat = null, fiveDays = false) => {
    let url;
    let exclude;

    if (query) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${UNITS}&appid=${API_KEY}`;
    } else if (fiveDays) {
      exclude = "currently,minutely,hourly";
      url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lonLat.lat}&lon=${this.state.lonLat.lon}&units=${UNITS}&exclude=${exclude}&appid=${API_KEY}`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?lon=${lonLat.lon}&lat=${lonLat.lat}&units=${UNITS}&appid=${API_KEY}`;
    }
    let response = await fetch(url);
    let data = await response.json();
    return response.ok ? data : null;
  };

  parseJson5Days = (data) => {
    let dailyArray = data.daily;
    let smallWeatherArray = [];
    //get small weather card data for 5 days
    for (let i = 0; i < 5; i++) {
      let daily = dailyArray[i];

      let card = {
        id: i + 1,
        temp: Math.round(daily.temp.day),
        humidity: daily.humidity,
        icon: this.formatIconName(daily.weather[0].icon),
        date: this.getDateUnix(daily.dt),
        // description: daily.weather[0].description,
      };

      smallWeatherArray.push(card);
    }

    //set state to new values
    this.setState({
      smallWeatherCards: smallWeatherArray,
    });
  };

  parseJson = (data) => {
    //5:05 PM, Mon, Nov 23,2020
    let temp = Math.round(data.main.temp);
    let description = data.weather[0].description;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;

    let date = new Date(0);
    date.setUTCSeconds(data.dt + data.timezone);
    date = this.getDate(date);
    let icon = this.formatIconName(data.weather[0].icon);

    let countryName = data.name;
    let alphaCode = data.sys.country;
    let country = {
      name: countryName,
      alphaCode: alphaCode,
    };
    let weatherCard = {
      tempCName: "flex-column temperature-lg",
      temp: temp,
      humidity: humidity,
      wind: wind,
      date: date,
      icon: icon,
      description: description,
    };

    this.setState({
      largeWeatherCard: weatherCard,
      country: country,
    });
  };

  formatIconName(str) {
    let exclude = ["01d", "01n", "02d", "02n", "10d", "10n"];
    return exclude.includes(str) ? str : str[0] + str[1];
  }

  getDateUnix(int) {
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
    let date_obj = new Date(0);
    date_obj.setUTCSeconds(int);
    let mm = months[date_obj.getMonth()];
    mm = mm[0] + mm[1] + mm[2];
    let dd = String(date_obj.getDate()).padStart(2, "0");

    let today_obj = new Date();
    return today_obj.getDate() === date_obj.getDate() &&
      today_obj.getMonth() === date_obj.getMonth()
      ? "Today"
      : `${mm} ${dd}`;
  }

  getDate(date_obj) {
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

  setMapBackground = async () => {
    let countryNameChart = document.getElementById("country-name-canvas");
    let height = countryNameChart.offsetHeight;
    let width = countryNameChart.offsetWidth;

    let src = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${this.state.lonLat.lon},${this.state.lonLat.lat},4,0/${width}x${height}?access_token=pk.eyJ1IjoiYWd1bGFtIiwiYSI6ImNrcWt2a2ZydTBkMTUyeG40cWFnN3NtNm0ifQ.7yV6k5s2KL2vwJEruQzeBQ`;

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
          <InputField
            functions={{
              verifyInput: this.verifyInput,
            }}
          />
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
          <div className="flex-column country-name-container">
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
