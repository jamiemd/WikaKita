import React, { Component } from "react";
import "./App.css";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SignUp />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
