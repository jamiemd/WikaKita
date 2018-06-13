import React, { Component } from "react";
import { connect } from "react-redux";
import {
  nextCard,
  showAnswer,
  updateBucket,
  correctAnswerCount
} from "../../Actions/flashcards";
import "../css/Flashcards.css";

class Flashcards extends Component {
  handleNoButtonClick = e => {
    this.props.nextCard();

    let currentFlashcard = this.props.flashcards.data[
      this.props.flashcards.currentIndex
    ];
    let newBucket;
    if (currentFlashcard.currentBucket <= 1) {
      newBucket = 1;
    } else {
      newBucket = currentFlashcard.currentBucket - 1;
    }
    // console.log('currentFlashcard.currentBucket no', currentFlashcard.currentBucket);
    this.props.updateBucket(currentFlashcard._id, newBucket);
  };

  handleYesButtonClick = e => {
    this.props.nextCard();
    this.props.correctAnswerCount();

    let currentFlashcard = this.props.flashcards.data[
      this.props.flashcards.currentIndex
    ];
    let newBucket;
    if (currentFlashcard.currentBucket >= 5) {
      newBucket = 5;
    } else {
      newBucket = currentFlashcard.currentBucket + 1;
    }
    // console.log('currentFlashcard.currentBucket yes', currentFlashcard.currentBucket);

    this.props.updateBucket(currentFlashcard._id, newBucket);
  };

  handleCardClick = e => {
    // this.props.toggleLanguage();
    this.props.showAnswer();
  };

  render() {
    // console.log("this.props flashcards", this.props);
    // if no cards then return null
    // console.log('flashcards this.props', this.props)

    let currentFlashcard = this.props.flashcards.data[
      this.props.flashcards.currentIndex
    ];

    // if front side of card then return back
    // console.log('index', this.props.flashcards.currentIndex);

    if (this.props.flashcards.cardSide === "front") {
      return (
        <div className="wrapper">
          {/* <div>{this.props.flashcards.currentIndex}</div> */}
          <div className="topWord">{currentFlashcard.english}</div>
          <button className="showAnswerButton" onClick={this.handleCardClick}>
            Show Answer
          </button>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          {/* <div className="stats"> {this.props.flashcards.currentIndex}</div> */}
          <div className="topWord">{currentFlashcard.english}</div>
          <div className="divider" />
          <div className="bottomWord">{currentFlashcard.tagalog}</div>
          <div className="rememberText">Did you remember it?</div>
          <div className="buttons">
            <button className="gradeButtons" onClick={this.handleNoButtonClick}>
              No
            </button>
            {/* <button className="gradeButtons" onClick={this.handleButtonClick}>Ok</button> */}
            <button
              className="gradeButtons"
              onClick={this.handleYesButtonClick}
            >
              Yes
            </button>
          </div>
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
  { nextCard, showAnswer, updateBucket, correctAnswerCount }
)(Flashcards);
