import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Actions/auth";
import "../css/SignIns.css";

class Navigation extends Component {
  handleLogoutClick = e => {
    this.props.logout();
  };

  render() {
    // console.log("this.props", this.props);
    return (
      <div className="nav-container">
        <Link className="headerLink" to="/">
          WikaKita
        </Link>
        <div className="signins">
          {this.props.authenticated ? (
            <Link to="/logout" onClick={this.handleLogoutClick}>
              Logout
            </Link>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
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

export default connect(
  mapStateToProps,
  { logout }
)(Navigation);
