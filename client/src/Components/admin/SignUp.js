import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { signup } from "../../Actions/auth";
import "../css/SignIns.css";

class SignUpForm extends Component {
  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  handleFormSubmit = ({ username, email, password }) => {
    const { history } = this.props;
    this.props.signup(username, email, password, history);
  };

  render() {
    // console.log("this.props", this.props);
    const { handleSubmit } = this.props;

    return (
      <div className="form-container">
        <div className="signins-title">Sign Up</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <label>Username</label>
          <div className="input">
            <Field name="username" component="input" type="text" />
          </div>
          <label>Email</label>
          <div className="input">
            <Field name="email" component="input" type="text" />
          </div>
          <label>Password</label>
          <div className="input">
            <Field name="password" component="input" type="text" />
          </div>
          <button type="submit">Submit</button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    registered: state.auth.registered
  };
};

SignUpForm = connect(
  mapStateToProps,
  { signup }
)(SignUpForm);

export default reduxForm({
  form: "signup",
  fields: ["username", "email", "password"]
})(SignUpForm);
