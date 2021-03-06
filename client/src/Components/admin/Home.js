import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCards } from "../../Actions/flashcards";
import "../css/Home.css";

class Home extends Component {
  componentDidMount() {
    this.props.getCards();
  }

  render() {
    return (
      <div className="home-container">
        {this.props.isLoggedIn ? (
          <div className="home-link-container">
            <div className="home-title">Flashcards Home</div>
            <div className="home-links">
              {this.props.flashcards.data.length !== 0 ? (
                <Link className="home-links" to="/flashcards">
                  Start Flashcards
                </Link>
              ) : (
                <div>You have no overdue cards</div>
              )}
              <Link className="home-links" to="/wordlist">
                Word List
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="home-title">Learn Tagalog Now!</div>
            <Link className="home-links" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state);
  return {
    isLoggedIn: state.auth.isLoggedIn,
    flashcards: state.flashcards
  };
};

export default connect(
  mapStateToProps,
  { getCards }
)(Home);
