import React, { Component } from "react";
import { connect } from "react-redux";
import { getCards } from "../../Actions/flashcards";
import { authenticate } from "../../Actions/auth";
import "../css/WordList.css";

class WordList extends Component {
  componentDidMount() {
    this.props.getCards();
    this.props.authenticate();
  }

  render() {
    console.log("wordlist this.props", this.props);
    console.log("this.props.flashcards.data", this.props.flashcards.data);

    return (
      <div className="statsContainer">
        <div className="wordlist-title">Word List</div>
        <div className="wordlist-headers">
          <div className="wordlist-header">English</div>
          <div className="wordlist-header">Tagalog</div>
        </div>
        {this.props.flashcards.data.map((flashcard, i) => (
          <div className="single-card-container" key={i}>
            <div>{flashcard.english}</div>
            <div>{flashcard.tagalog}</div>
          </div>
        ))}
        <div />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state);
  return { flashcards: state.flashcards, isLoggedIn: state.auth.isLoggedIn };
};

export default connect(
  mapStateToProps,
  { authenticate, getCards }
)(WordList);
