import React, { Component } from "react";
import { Link } from "react-router-dom";
import Flashcards from "./Flashcards";
import { connect } from "react-redux";
import "../css/FlashcardContainer.css";

import {
  getCards,
  nextCard,
  showAnswer,
  updateBucket,
  resetCardState
} from "../../Actions/flashcards";

class FlashcardContainer extends Component {
  componentDidMount() {
    console.log("this.props getcards", this.props);
    this.props.getCards();
  }

  render() {
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
  return { flashcards: state.flashcards };
};

export default connect(
  mapStateToProps,
  { getCards, nextCard, showAnswer, updateBucket, resetCardState }
)(FlashcardContainer);
