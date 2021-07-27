const temperatureBackground = "rgba(195, 40, 96, 0.5)";
const temperatureBorder = "rgba(195, 40, 96, 1)";

const feelsLikeBackground = "rgba(255, 172, 100, 0.5)";
const feelsLikeBorder = "rgba(255, 172, 100, 1)";

const humidityBackground = "rgba(41, 128, 185, 0.5)";
const humidityBorder = "rgba(41, 128, 185, 1)";

const celciusTitle = "°C";
const celciusColor = "rgba(236, 132, 98, 1)";

const percentTitle = "%";

const tempLabel = "Temperature";
const feelsLikeLabel = "Feels Like";
const humidityLabel = "Humidity";

function formatDate(int) {
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

let datasets = {
  line: {
    pointBorderColor: "#202b33",
    pointHoverBorderColor: "rgba(225,225,225,0.9)",
    pointHoverBorderWidth: 1,
    pointStyle: "circle",
    pointRadius: 4,
    pointBorderWidth: 1,
    borderWidth: 2,
    fill: true,
  },
};

let scalesX = {
  type: "time",
  time: {
    unit: "hour",
  },
  grid: {
    display: false,
  },

  ticks: {
    //format ticks to differenciate dates
    callback: function (value, index, values) {
      //if it is the mark of a a new day (divisible by 24), return a string of the day instead
      if (index % 24 === 0) {
        return formatDate(values[index].value);
      }
      return value;
    },
  },
};

let plugins = {
  legend: {
    labels: {
      padding: 20,
      usePointStyle: true,
      pointStyle: "circle",

      font: {
        size: 17,
      },
    },
  },
};

export const config = {
  type: "line",

  //each chart needs a seperate object or else there will be bugs
  //see https://stackoverflow.com/questions/36595235/why-are-my-two-charts-repeating-the-same-label

  data1: {
    datasets: [
      {
        label: tempLabel,
        backgroundColor: temperatureBackground,
        borderColor: temperatureBorder,
        pointBackgroundColor: temperatureBorder,
      },
      {
        label: feelsLikeLabel,
        backgroundColor: feelsLikeBackground,
        borderColor: feelsLikeBorder,
        pointBackgroundColor: feelsLikeBorder,
      },
    ],
  },

  data2: {
    datasets: [
      {
        label: humidityLabel,
        backgroundColor: humidityBackground,
        borderColor: humidityBorder,
        pointBackgroundColor: humidityBorder,
      },
    ],
  },

  options1: {
    responsive: true,
    datasets: datasets,
    scales: {
      x: scalesX,
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          font: {
            size: 18,
          },
          color: celciusColor,
          text: celciusTitle,
        },
        ticks: {
          color: celciusColor,
        },
      },
    },
    plugins: plugins,
  },

  options2: {
    responsive: true,
    datasets: datasets,
    scales: {
      x: scalesX,
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          font: {
            size: 18,
          },
          color: humidityBorder,
          text: percentTitle,
        },
        ticks: {
          color: humidityBorder,
        },
      },
    },
    plugins: plugins,
  },
};
