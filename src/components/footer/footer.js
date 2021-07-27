import "./footer.css";

const Footer = () => {
  return (
    <div className="flex-row footer-container">
      <div className="flex-column">
        <p>Developed by Agulam Chigabatia</p>
        <p>
          Powered by&nbsp;
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Weather Map"
          >
            Open Weather Map,&nbsp;
          </a>
          <a
            href="https://www.mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Mapbox"
          >
            Mapbox&nbsp;
          </a>
          and React
        </p>
        <p>
          <a
            href="  https://www.openstreetmap.org/"
            title="OPen Street Map"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Street Map;
          </a>
        </p>
      </div>
      <div className="flex-column">
        <p>
          Icons made by&nbsp;
          <a
            href="https://www.freepik.com"
            title="Freepik"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freepik&nbsp;
          </a>
          from&nbsp;
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.flaticon.com
          </a>
        </p>
        <p>
          <a
            href="https://www.chartjs.org/"
            title="Chart.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chart.js
          </a>
        </p>
        <p>
          <a
            href="https://leafletjs.com/"
            title="Leaflet"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leaflet
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
