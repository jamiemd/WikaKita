import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetCardState, correctAnswerCount } from "../../Actions/flashcards";
import "../css/Results.css";

class ResultsPage extends Component {
  handleHomeClick = e => {
    this.props.resetCardState();
  };

  render() {
    console.log("results this.props", this.props);

    return (
      <div className="resultsContainer">
        <div className="resultsText">
          <div className="numberCorrect">
            {this.props.flashcards.correctAnswerCount}
          </div>
          <div className="slash"> / </div>
          <div>{this.props.flashcards.data.length}</div>
        </div>
        <div className="correctText">Correct</div>
        <div className="homeButtonContainer">
          <Link className="homeButton" to="/" onClick={this.handleHomeClick}>
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
  { resetCardState, correctAnswerCount }
)(ResultsPage);
