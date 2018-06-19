import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCards,
  nextCard,
  showAnswer,
  updateBucket,
  correctAnswerCount
} from "../../Actions/flashcards";
import "../css/Flashcards.css";
import Results from "./Results";

class FlashcardData extends Component {
  componentDidMount() {
    this.props.getCards();
  }

  handleShowAnswerClick = () => {
    this.props.showAnswer();
  };

  handleNoButtonClick = () => {
    const grade = "no";
    const currentFlashcard = this.props.flashcards.data[
      this.props.flashcards.currentIndex
    ];
    this.props.nextCard();
    this.props.updateBucket(currentFlashcard._id, grade);
  };

  handleYesButtonClick = () => {
    const grade = "yes";
    const currentFlashcard = this.props.flashcards.data[
      this.props.flashcards.currentIndex
    ];

    this.props.nextCard();
    this.props.correctAnswerCount();
    this.props.updateBucket(currentFlashcard._id, grade);
  };

  render() {
    const cardSide = this.props.flashcards.cardSide;
    const currentIndex = this.props.flashcards.currentIndex;
    const currentFlashcard = this.props.flashcards.data[currentIndex];
    const arrayLength = this.props.flashcards.data.length;

    if (currentIndex + 1 > arrayLength) {
      return <Results />;
    }
    if (!currentFlashcard) {
      return null;
    }

    if (this.props.flashcards.length !== 0) {
      return (
        <div className="wrapper">
          {cardSide === "front" ? (
            <div>
              <div className="topWord">{currentFlashcard.english}</div>
              <button
                className="showAnswer"
                onClick={this.handleShowAnswerClick}
              >
                Show Answer
              </button>
            </div>
          ) : (
            <div>
              <div className="topWord">{currentFlashcard.english}</div>
              <div className="divider" />
              <div className="bottomWord">{currentFlashcard.tagalog}</div>
              <div className="rememberText">Did you remember it?</div>
              <div className="buttons">
                <button
                  className="gradeButtons"
                  onClick={this.handleNoButtonClick}
                >
                  No
                </button>
                <button
                  className="gradeButtons"
                  onClick={this.handleYesButtonClick}
                >
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { flashcards: state.flashcards };
};

export default connect(
  mapStateToProps,
  { getCards, nextCard, showAnswer, updateBucket, correctAnswerCount }
)(FlashcardData);
