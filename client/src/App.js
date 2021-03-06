import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Components/admin/Home";
import SignUp from "./Components/admin/SignUp";
import Login from "./Components/admin/Login";
import Navigation from "./Components/admin/Navigation";
import FlashcardsContainer from "./Components/flashcards/FlashcardContainer";
import WordList from "./Components/flashcards/WordList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Home} />
          <Route exact path="/flashcards" component={FlashcardsContainer} />
          <Route exact path="/wordlist" component={WordList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
