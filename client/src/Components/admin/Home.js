import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return <div>Welcome to WikaKita</div>;
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Home);
