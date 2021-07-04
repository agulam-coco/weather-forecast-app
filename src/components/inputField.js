import react from "react";
import React, { Component } from "react";
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
          placeholder="London, GB"
        />
        <div className="flex-column">
          <button
            className="search-button thin-border"
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
