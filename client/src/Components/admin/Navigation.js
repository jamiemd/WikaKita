import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../css/SignIns.css";

class Navigation extends Component {
  render() {
    return (
      <div className="nav-container">
        <Link className="headerLink" to="/">
          WikaKita
        </Link>
        <div className="signins">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Navigation);
