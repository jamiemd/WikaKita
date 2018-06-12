import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Flashcards from "./Flashcards";
import "../css/FlashcardContainer.css";

import {
  getCards,
  nextCard,
  showAnswer,
  updateBucket,
  resetCardState
} from "../../Actions/flashcards";

import { authenticate } from "../../Actions/auth";

class FlashcardContainer extends Component {
  componentDidMount() {
    console.log("this.props flashcards", this.props);
    this.props.getCards();
    this.props.authenticate();
  }

  render() {
    // if no overdue cards, show no data
    // if overdue cards, show current flashcard
    // if finished show results page

    if (
      this.props.flashcards.data === undefined ||
      this.props.flashcards.data === 0
    ) {
      return null;
    }

    if (this.props.flashcards.showResultsPage) {
      return (
        <div className="cardContainer">
          <div className="exitContainer">
            <Link className="exit" to="/home">
              X
            </Link>
          </div>
        </div>
      );
    }

    let currentFlashcard = this.props.flashcards.data[
      this.props.flashcards.currentIndex
    ];
    if (currentFlashcard) {
      return (
        <div className="cardContainer">
          <div className="exitContainer">
            <Link className="exit" to="/home">
              X
            </Link>
          </div>
          <Flashcards />
        </div>
      );
    }

    return (
      <div className="cardContainer">
        <div className="exitContainer">
          <Link className="exit" to="/home">
            X
          </Link>
        </div>
        <div className="overdueText">There are no overdue cards</div>
        <div className="homeButtonContainer">
          <Link className="homeButton" to="/">
            Home
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state);
  return { flashcards: state.flashcards };
};

export default connect(
  mapStateToProps,
  { authenticate, getCards, nextCard, showAnswer, updateBucket, resetCardState }
)(FlashcardContainer);
