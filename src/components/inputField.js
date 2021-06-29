import react from "react";
import React, { Component } from "react";
import "./css/inputField.css";

class InputField extends Component {
  render() {
    return (
      <div className="flex-column">
        <label htmlFor="input-field"> City </label>
        <input
          type="text"
          id="input-field"
          name="input-field"
          className="thin-border"
        />
      </div>
    );
  }
}

export default InputField;
