import React, { Component } from "react";
import "./css/error.css";

class Error extends Component {
  state = {};
  render() {
    return (
      <div className="alert-error" id="error">
        <img
          src={`${process.env.PUBLIC_URL}/error-icons/${this.props.errorIcon}.svg`}
          id="error-img"
          alt="Error Icon"
        ></img>
        <p id="error-text">Blah Blah Blah</p>
      </div>
    );
  }
}

export default Error;
