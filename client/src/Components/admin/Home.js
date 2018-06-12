import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    // console.log("this.props", this.props);
    return (
      <div>
        {this.props.authenticated ? (
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
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Home);
