import React, { Component } from "react";
import "./App.css";
import CountryName from "./components/countryName";
import Error from "./components/error";
import InputField from "./components/inputField";
import LargeWeatherCard from "./components/largeWeatherCard";
import Map from "./components/map";
import SmallWeatherCard from "./components/smallWeatherCard";
import WeatherChart from "./components/weatherChart";

const UNITS = "metric";

class App extends Component {
  state = {
    lonLat: { lon: 0, lat: 0 },

    errorIcon: "alert-error",

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

    locationIcon: "default",

    hourly: {
      date: [],
      temp: [],
      humidity: [],
      feelsLike: [],
    },
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleMobileLogic);
    window.addEventListener("resize", this.handleMobileLogic);
    window.addEventListener("load", this.handleMobileLogic);

    window.addEventListener("resize", this.handleLocationIcon);

    this.preloadWeatherImages();
    this.getUserLocation(true);
    this.handleLocationIcon();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleMobileLogic);
    window.removeEventListener("resize", this.handleMobileLogic);
    window.removeEventListener("load", this.handleMobileLogic);

    window.removeEventListener("resize", this.handleLocationIcon);
  }

  removeErrorMessages = () => {
    document.getElementById("error").style.opacity = 0;
  };

  setError = (errorType, errorMessage) => {
    const errorDiv = document.getElementById("error");
    const errorText = document.getElementById("error-text");

    this.setState({ errorIcon: errorType });
    errorDiv.className = errorType;
    errorText.textContent = errorMessage;
    errorDiv.style.opacity = 1;
  };

  handleLocationIcon = () => {
    const deviceWidth = window.innerWidth;
    let icon = "";

    if (deviceWidth <= 480) icon = "mobile";
    else if (deviceWidth <= 768) icon = "tablet";
    else if (deviceWidth <= 1024) icon = "laptop";
    else if (deviceWidth <= 1200) icon = "desktop";
    else icon = "default";

    this.setState({ locationIcon: icon });
  };

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
      //show country name
      document.getElementById("mobile-country-name").style.display = "block";
      document.getElementById("card").style.marginTop = "0";

      let gridTop = window.innerHeight * 0.2,
        gridBottom = window.innerHeight * 0.8;

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
      // document.getElementById("card").style.marginTop = "54px";
    }
  };

  preloadWeatherImages = async () => {
    const imagesArray = [
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
    const navIcons = ["mobile", "tablet", "laptop", "desktop", "default"];
    const errorIcons = ["alert-error", "alert-warning"];

    //load weather icons
    imagesArray.forEach(
      (value) =>
        (new Image().src =
          process.env.PUBLIC_URL + "/weather-icons/svg/" + value + ".svg")
    );

    //load navigation icons
    navIcons.forEach(
      (value) =>
        (new Image().src = process.env.PUBLIC_URL) +
        "/navigation-icons/svg/" +
        value +
        ".svg"
    );

    //load error icons
    errorIcons.forEach((value) => {
      new Image().src =
        process.env.PUBLIC_URL + "/error-icons/" + value + ".svg";
    });
  };

  getUserLocation = async (compMount = false) => {
    if (navigator.geolocation) {
      //geolocation options
      const options = {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 300_000,
      };
      //Get user geolocation
      navigator.geolocation.getCurrentPosition(
        this.getLonLat,
        (err) => {
          console.error(err);

          const code = err.code;
          let errorMessage;

          switch (code) {
            case err.PERMISSION_DENIED:
              errorMessage = "Geolocation access denied";
              break;

            case err.POSITION_UNAVAILABLE:
              errorMessage = "Geolocation fetch failed";
              break;

            case err.TIMEOUT:
              errorMessage = "Geolocation timed out";
              break;

            default:
              errorMessage = "An unknown error has occured";
          }
          //set error message if this is not the first time app is loading else set default country without error message
          if (compMount) this.setDefaultCountry();
          else this.setError("alert-warning", errorMessage);
        },
        options
      );
    } else {
      console.error("User location not supported");
      this.setError("alert-warning", "User location not supported");

      if (compMount) this.setDefaultCountry();
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

  verifyInput = async () => {
    let userCountry = document.getElementById("input-field").value;

    if (userCountry.trim()) {
      this.removeErrorMessages();
      let query = userCountry;

      this.fetchWeatherInfo(
        // `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${UNITS}&appid=${API_KEY}`
        `/api/weather?q=${query}&units=${UNITS}`
      )
        .then((data) => {
          if (data) {
            this.parseJson(data);
            this.setLonLatState(data);
            this.fetchsmallWeatherInfo();
          } else {
            console.error("City or country not found.");
            this.setError("alert-error", "City or country not found");
          }
        })
        .catch((error) => {
          console.error(error);
          this.setError("alert-error", "Failed to fetch weather data");
        });
    } else {
      this.setError("alert-warning", "Input cannot be blank");
    }
  };

  setLonLatState = (data) => {
    //set long and lat data to state
    this.setState(
      {
        lonLat: { lon: data.coord.lon, lat: data.coord.lat },
      },
      this.setMapBackground
    );
  };

  fetchsmallWeatherInfo = async () => {
    //excluded values in api call
    let exclude = "currently,minutely";

    this.fetchWeatherInfo(
      // `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lonLat.lat}&lon=${this.state.lonLat.lon}&units=${UNITS}&exclude=${exclude}&appid=${API_KEY}`
      `/api/onecall?lat=${this.state.lonLat.lat}&lon=${this.state.lonLat.lon}&units=${UNITS}&exclude=${exclude}`
    )
      .then((data) => {
        if (data) {
          this.parseJson5Days(data);
          this.parseHourlyJson(data);
        } else this.setError("alert-error", "Failed to fetch weather forecast");
      })
      .catch((error) => {
        console.error(error);
        this.setError("alert-error", "Failed to fetch weather data");
      });
  };

  getLonLat = async (lonLatGeoLocation) => {
    let lonLat = {
      lon: lonLatGeoLocation.coords.longitude,
      lat: lonLatGeoLocation.coords.latitude,
    };

    this.fetchWeatherInfo(
      // `https://api.openweathermap.org/data/2.5/weather?lon=${lonLat.lon}&lat=${lonLat.lat}&units=${UNITS}&appid=${API_KEY}`
      `/api/geo?lon=${lonLat.lon}&lat=${lonLat.lat}&units=${UNITS}`
    )

      .then((data) => {
        if (data) {
          this.parseJson(data);
          this.setLonLatState(data);
          this.fetchsmallWeatherInfo();
        } else {
          this.setError("alert-error", "Invalid Geolocation data");
        }
      })
      .catch((error) => {
        console.error(error);
        this.setError("alert-error", "Failed to fetch weather data");
      });
  };

  fetchWeatherInfo = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return response.ok ? data : null;
  };

  parseJson5Days = async (data) => {
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

  parseJson = async (data) => {
    //large weather card data
    let temp = Math.round(data.main.temp);
    let description = data.weather[0].description;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    let icon = this.formatIconName(data.weather[0].icon);
    let date = this.getDate(data.dt + data.timezone);

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

  parseHourlyJson = async (data) => {
    let hourlyArray = data.hourly,
      dateArray = [],
      temperatureArray = [],
      feelsLikeArray = [],
      humidityArray = [];

    for (let i = 0; i < hourlyArray.length; i++) {
      let hourData = hourlyArray[i];

      let date = this.getDateObject(hourData.dt).getTime();
      let temp = hourData.temp;
      let feelsLike = hourData.feels_like;
      let humidity = hourData.humidity;

      dateArray.push(date);
      temperatureArray.push(temp);
      feelsLikeArray.push(feelsLike);
      humidityArray.push(humidity);
    }

    //set state with an object filed with arrays
    let hourlyObj = {
      date: dateArray,
      temp: temperatureArray,
      feelsLike: feelsLikeArray,
      humidity: humidityArray,
    };

    this.setState({ hourly: hourlyObj });
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
    let dateObj = this.getDateObject(int);

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

  formatHourlyDate(int) {
    let dateObj = this.getDateObject(int);
    return `${dateObj.getHours()}:00`;
  }

  getDateObject(int) {
    return new Date(int * 1000);
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
    let dateObj = this.getDateObject(int);
    let dayName = days[dateObj.getDay()];
    let dd = String(dateObj.getDate()).padStart(2, "0");
    let mm = months[dateObj.getMonth()];
    let yyyy = dateObj.getFullYear();

    let hh = dateObj.getHours();
    let mn = dateObj.getMinutes();
    //format minutes field
    mn = mn < 10 ? "0" + mn : mn;
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
      <React.Fragment>
        <div id="logo-container" className="flex-row">
          <span id="logo">Niebla</span>
          <span id="logo-trail">Weather Forecast</span>
        </div>
        <div>
          <div
            className="main-weather-container flex-column"
            id="main-weather-container"
          >
            <div id="main-weather-child-1" className="flex-row">
              <div className="flex-column margin-lg" id="div-box-1">
                <InputField
                  locationIcon={this.state.locationIcon}
                  functions={{
                    verifyInput: this.verifyInput,
                    getUserLocation: this.getUserLocation,
                    removeErrorMessages: this.removeErrorMessages,
                  }}
                />
                <div className="mobile-country-name" id="mobile-country-name">
                  {this.state.country.name +
                    ", " +
                    this.state.country.alphaCode}
                </div>
                <div className="flex-column">
                  <Error errorIcon={this.state.errorIcon} />
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
            <div className="map-container">
              <Map lon={this.state.lonLat.lon} lat={this.state.lonLat.lat} />
            </div>
            <div className="flex-column faint" style={{ fontSize: "40px" }}>
              <WeatherChart hourly={this.state.hourly} />
              <b style={{ margin: "160px 0" }}>
                SECTION
                <br /> COMING SOON
              </b>
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
      </React.Fragment>
    );
  }
}
export default App;
