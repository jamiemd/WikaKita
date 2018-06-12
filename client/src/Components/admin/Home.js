import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <div>Welcome to WikaKita</div>
            <Link to="/flashcards">Start</Link>
          </div>
        ) : (
          <div>Sign Up</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Home);
