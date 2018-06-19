import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCards } from "../../Actions/flashcards";
class Home extends Component {
  componentDidMount() {
    this.props.getCards();
  }

  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
          <div>
            <div>Welcome to WikaKita</div>
            {this.props.flashcards.data.length !== 0 ? (
              <Link to="/flashcards">Start</Link>
            ) : (
              <div>You have no overdue cards</div>
            )}
            <div>
              <Link to="/wordlist">WordList</Link>
            </div>
          </div>
        ) : (
          <div>
            <h1>Welcome</h1>Sign Up
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    flashcards: state.flashcards
  };
};

export default connect(
  mapStateToProps,
  { getCards }
)(Home);
