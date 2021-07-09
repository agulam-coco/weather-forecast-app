import { Component } from "react";
import "./css/inputField.css";

class InputField extends Component {
  componentDidMount() {
    document
      .getElementById("input-field")
      .addEventListener("keyup", this.handleKeyup);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyup);
  }

  handleKeyup = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("search-button").click();
    }

    //remove error messages
    this.props.functions.removeErrorMessages();
  };

  render() {
    return (
      <div className="flex-column">
        <i className="fas fa-search"></i>
        <input
          type="text"
          id="input-field"
          name="input-field"
          className="thin-border"
          placeholder="Type something"
        />
        <div className="flex-row">
          <button
            className="round-border"
            id="location-button"
            onClick={() => {
              this.props.functions.removeErrorMessages();
              this.props.functions.getUserLocation();
            }}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                "/navigation-icons/svg/" +
                this.props.locationIcon +
                ".svg"
              }
              alt="User Location Icon"
            ></img>
          </button>
          <button
            className="search-button"
            id="search-button"
            onClick={this.props.functions.verifyInput}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
export default InputField;
