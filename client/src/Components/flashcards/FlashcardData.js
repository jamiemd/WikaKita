import React, { Component } from "react";
import { connect } from "react-redux";
import {
  nextCard,
  showAnswer,
  updateBucket,
  correctAnswerCount
} from "../../Actions/flashcards";
import "../css/Flashcards.css";
import Results from "./Results";

class FlashcardData extends Component {
  handleShowAnswerClick = () => {
    this.props.showAnswer();
  };

  handleNoButtonClick = () => {
    this.props.nextCard();

    const currentFlashcard = this.props.flashcards.data[
      this.props.flashcards.currentIndex
    ];
    const grade = "no";

    this.props.updateBucket(currentFlashcard._id, grade);
  };

  handleYesButtonClick = () => {
    this.props.nextCard();
    this.props.correctAnswerCount();

    const currentFlashcard = this.props.flashcards.data[
      this.props.flashcards.currentIndex
    ];
    const grade = "yes";

    this.props.updateBucket(currentFlashcard._id, grade);
  };

  render() {
    console.log("this.props", this.props);

    const cardSide = this.props.flashcards.cardSide;
    const currentIndex = this.props.flashcards.currentIndex;
    const currentFlashcard = this.props.flashcards.data[currentIndex];
    const flashcardsArrayLength = this.props.flashcards.data.length - 1;

    if (this.props === undefined) {
      return null;
    }

    return (
      <div>
        {flashcardsArrayLength != currentIndex ? (
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
        ) : (
          <Results />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { flashcards: state.flashcards };
};

export default connect(
  mapStateToProps,
  { nextCard, showAnswer, updateBucket, correctAnswerCount }
)(FlashcardData);
