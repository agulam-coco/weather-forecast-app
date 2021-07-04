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
    window.addEventListener("scroll", this.handleMobileLogic);
    window.addEventListener("resize", this.handleMobileLogic);
    window.addEventListener("load", this.handleMobileLogic);

    this.preloadWeatherImages();
    this.getUserLocation();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleMobileLogic);
    window.removeEventListener("resize", this.handleMobileLogic);
    window.removeEventListener("load", this.handleMobileLogic);
  }

  handleMobileLogic = () => {
    const mobileMaxHeight = 630;
    const classNameDesktop = "flex-column small-card";
    const classNameMobileHighlight = "flex-column small-card-mobile-highlight";
    const classNameMobile = "flex-column small-card-mobile";
    const classNames = [
      "small-card",
      "small-card-mobile",
      "small-card-mobile-highlight",
    ];

    //if device is a phone
    if (window.innerWidth <= mobileMaxHeight) {
      let gridTop = window.innerHeight * 0.2,
        gridBottom = window.innerHeight * 0.7;

      //loop through each of the potential class names and handle
      for (let i = 0; i < classNames.length; i++) {
        //select small weather cards with classname
        let elems = document.getElementsByClassName(classNames[i]);

        //loop through each of the five cards
        if (elems)
          for (let j = 0; j < elems.length; j++) {
            let elem = elems[j];

            // get the top of the element
            let elemTop = elem.offsetTop - window.pageYOffset;

            //highlight card
            if (
              elemTop >= gridTop &&
              elemTop + elem.offsetHeight <= gridBottom
            ) {
              elem.className = classNameMobile + classNameMobileHighlight;
            }
            //return card to normal
            else {
              elem.className = classNameMobile;
            }
          }
      }
    }
    //restore larger screen class name
    else {
      for (let i = 0; i < classNames.length; i++) {
        let elems = document.getElementsByClassName(classNames[i]);
        if (elems) {
          for (let j = 0; j < elems.length; j++) {
            elems[j].className = classNameDesktop;
          }
        }
      }

      //hide mobile country name
      document.getElementById("mobile-country-name").style.display = "none";
    }
  };

  preloadWeatherImages = () => {
    let imagesArray = [
      "01d",
      "01n",
      "02d",
      "02n",
      "03",
      "04",
      "09",
      "10d",
      "10n",
      "11",
      "13",
      "50",
    ];

    for (let i = 0; i < imagesArray.length; i++) {
      new Image().src =
        process.env.PUBLIC_URL +
        "/weather-icons/svg/" +
        imagesArray[i] +
        ".svg";
    }
  };

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
      let query = userCountry;

      this.fetchWeatherInfo(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${UNITS}&appid=${API_KEY}`
      )
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
    //set long and lat data to state
    this.setState({
      lonLat: { lon: data.coord.lon, lat: data.coord.lat },
    });
  };

  fetchsmallWeatherInfo = () => {
    //excluded values in api call
    let exclude = "currently,minutely,hourly";

    this.fetchWeatherInfo(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lonLat.lat}&lon=${this.state.lonLat.lon}&units=${UNITS}&exclude=${exclude}&appid=${API_KEY}`
    )
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

    this.fetchWeatherInfo(
      `https://api.openweathermap.org/data/2.5/weather?lon=${lonLat.lon}&lat=${lonLat.lat}&units=${UNITS}&appid=${API_KEY}`
    )

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

  fetchWeatherInfo = async (url) => {
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
        date: this.formatSmallWeatherDate(daily.dt),
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
    //large weather card data
    let temp = Math.round(data.main.temp);
    let description = data.weather[0].description;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let icon = this.formatIconName(data.weather[0].icon);
    let date = new Date(0);
    date.setUTCSeconds(data.dt + data.timezone);
    date = this.getDate(date);

    //country data for country name
    let countryName = data.name;
    let alphaCode = data.sys.country;

    //country obj
    let country = {
      name: countryName,
      alphaCode: alphaCode,
    };

    //large weather card obj
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
    //exclude the day or night tag at the end except for these noted
    let exclude = ["01d", "01n", "02d", "02n", "10d", "10n"];
    return exclude.includes(str) ? str : str[0] + str[1];
  }

  formatSmallWeatherDate(int) {
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

    //date obj with utc time
    let dateObj = this.getUtcDateObj(int);

    //formating
    let mm = months[dateObj.getMonth()];
    mm = mm[0] + mm[1] + mm[2];
    let dd = String(dateObj.getDate()).padStart(2, "0");

    //(date is today)? 'today': regular date format;
    let today_obj = new Date();
    return today_obj.getDate() === dateObj.getDate() &&
      today_obj.getMonth() === dateObj.getMonth()
      ? "Today"
      : `${mm} ${dd}`;
  }

  getUtcDateObj(int) {
    let dateObj = new Date(0);
    dateObj.setUTCSeconds(int);
    return dateObj;
  }

  getDate(int) {
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

    //string formating
    let dateObj = this.getUtcDateObj(int);
    let dayName = days[dateObj.getDay()];
    let dd = String(dateObj.getDate()).padStart(2, "0");
    let mm = months[dateObj.getMonth()];
    let yyyy = dateObj.getFullYear();

    let hh = dateObj.getHours();
    let mn = dateObj.getMinutes();
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
      <div>
        <div className="main-weather-container" id="main-weather-container">
          <div className="flex-column margin-lg" style={{ marginTop: "0px" }}>
            <InputField
              functions={{
                verifyInput: this.verifyInput,
              }}
            />
            <div class="mobile-country-name" id="mobile-country-name">
              {this.state.country.name + ", " + this.state.country.alphaCode}
            </div>

            <LargeWeatherCard
              obj={this.state.largeWeatherCard}
              tempCName={this.state.largeWeatherCard.tempCName}
            />
          </div>
          <div className="flex-column margin-lg" id="div-box-2">
            <div className="flex-row" id="small-weather-container">
              {this.state.smallWeatherCards.map((weatherCard) => (
                <SmallWeatherCard
                  key={weatherCard.id}
                  obj={weatherCard}
                  tempCName={this.state.smallWeatherClassName}
                />
              ))}
            </div>
            <div
              className="flex-column country-name-container"
              id="country-name-container"
            >
              <CountryName
                name={this.state.country.name}
                alphaCode={this.state.country.alphaCode}
              />
            </div>
          </div>
        </div>
        <div>
          Icons made by
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>
          from
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    );
  }
}
export default App;
