import React, { Component } from "react";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div>
        <label>Username</label>
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <label>Email</label>
        <input
          type="text"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <label>Password</label>
        <input
          type="text"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
      </div>
    );
  }
}

export default SignUp;
