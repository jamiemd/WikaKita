import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FlashcardData from "./FlashcardData";
import Home from "../admin/Home";
import { getCards, resetCardState } from "../../Actions/flashcards";
import { authenticate } from "../../Actions/auth";
import "../css/FlashcardContainer.css";

class FlashcardContainer extends Component {
  componentDidMount() {
    this.props.getCards();
    this.props.authenticate();
  }

  handleExitButtonClick() {
    this.props.resetCardState();
  }

  render() {
    // console.log("this.props", this.props);
    const isLoggedIn = this.props.isLoggedIn;
    const currentIndex = this.props.flashcards.currentIndex;
    const flashcardsArrayLength = this.props.flashcards.data.length;
    let percentageComplete = (currentIndex / flashcardsArrayLength) * 680;

    if (!percentageComplete) {
      percentageComplete = 0;
    }

    return (
      <div>
        {isLoggedIn ? (
          <div className="card-container">
            <div className="card-header">
              <div className="progress">
                {currentIndex}/{flashcardsArrayLength}
              </div>
              <div className="progress-bar">
                <div
                  className="my-progress"
                  style={{ width: percentageComplete }}
                />
              </div>
              <div className="exit-container">
                <Link
                  onClick={this.handleExitButtonClick}
                  className="exit"
                  to="/"
                >
                  X
                </Link>
              </div>
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
  return { isLoggedIn: state.auth.isLoggedIn, flashcards: state.flashcards };
};

export default connect(
  mapStateToProps,
  { authenticate, getCards, resetCardState }
)(FlashcardContainer);
