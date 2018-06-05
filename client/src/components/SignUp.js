import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { signup } from "../Actions/auth";
import "./SignUp.css";

class SignUp extends Component {
  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  handleFormSubmit = ({ username, email, password }) => {
    console.log("form submitted");
    this.props.signup(username, email, password);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <fieldset className="signup-container">
            <label>Username</label>
            <Field name="username" component="input" type="text" />
            <label>Email</label>
            <Field name="email" component="input" type="email" />
            <label>Password</label>
            <Field name="password" component="input" type="password" />
            <button type="submit">Sign Up</button>
            {this.renderAlert()}
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

SignUp = connect(
  mapStateToProps,
  { signup }
)(SignUp);

export default reduxForm({
  form: "signup",
  fields: ["username", "email", "password"]
})(SignUp);
