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
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <div>
        {isLoggedIn ? (
          <div className="cardContainer">
            <div className="exitContainer">
              <Link className="exit" to="/home">
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
  return { flashcards: state.flashcards, isLoggedIn: state.auth.isLoggedIn };
};

export default connect(
  mapStateToProps,
  { authenticate, getCards }
)(FlashcardContainer);
