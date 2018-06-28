import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Actions/auth";
import "../css/Navigation.css";

class Navigation extends Component {
  handleLogoutClick = () => {
    this.props.logout();
  };

  render() {
    // console.log("this.props", this.props);
    return (
      <div className="nav-background">
        <div className="nav-container">
          <Link className="nav-link wikakita-logo" to="/">
            WikaKita
          </Link>
          <div className="signins">
            {this.props.isLoggedIn ? (
              <Link
                className="nav-link"
                to="/"
                onClick={this.handleLogoutClick}
              >
                Logout
              </Link>
            ) : (
              <div className="signins">
                <Link className="nav-link login" to="/login">
                  Login
                </Link>
                <Link className="nav-link signup" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Navigation);
