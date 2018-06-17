import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FlashcardData from "./FlashcardData";
import "../css/FlashcardContainer.css";
import Home from "../admin/Home";

import { getCards } from "../../Actions/flashcards";
import { authenticate } from "../../Actions/auth";

class FlashcardContainer extends Component {
  componentDidMount() {
    this.props.getCards();
    this.props.authenticate();
  }

  render() {
    // console.log("this.props", this.props);
    const isLoggedIn = this.props.isLoggedIn;
    const currentIndex = this.props.flashcards.currentIndex + 1;
    const flashcardsArrayLength = this.props.flashcards.data.length;

    return (
      <div>
        {isLoggedIn ? (
          <div className="cardContainer">
            <div className="exitContainer">
              <div>
                {currentIndex}/{flashcardsArrayLength}
              </div>
              <Link className="exit" to="/">
                X
              </Link>
            </div>
            <FlashcardData />
          </div>
        ) : (
          <Home />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state", state);
  return { isLoggedIn: state.auth.isLoggedIn, flashcards: state.flashcards };
};

export default connect(
  mapStateToProps,
  { authenticate, getCards }
)(FlashcardContainer);
