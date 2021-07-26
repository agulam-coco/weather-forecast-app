export const temperatureBackground = "rgba(195, 40, 96, 0.5)";
export const temperatureBorder = "rgba(195, 40, 96, 1)";

export const feelsLikeBackground = "rgba(255, 172, 100, 0.5)";
export const feelsLikeBorder = "rgba(255, 172, 100, 1)";

export const humidityBackground = "rgba(41, 128, 185, 0.5)";
export const humidityBorder = "rgba(41, 128, 185, 1)";

export const celciusTitle = "°C";
export const celciusColor = "rgba(236, 132, 98, 1)";

export const percentTitle = "%";

export const tempLabel = "Temperature";
export const feelsLikeLabel = "Feels Like";
export const humidityLabel = "Humidity";

export const config = {
  type: "line",

  options: {
    responsive: true,

    datasets: {
      line: {
        pointBorderColor: "#202b33",
        pointHoverBorderColor: "rgba(225,225,225,0.9)",
        pointHoverBorderWidth: 1,
        pointStyle: "/cross",
        pointRadius: 4,
        pointBorderWidth: 1,
        borderWidth: 2,
        fill: true,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
        },
        grid: {
          display: false,
        },
     
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          font: {
            size: 18,
          },
        },
      },
    },
    plugins: {
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
    },
  },
};

