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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <label>Username</label>
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label>Email</label>
          <Field name="email" component="input" type="text" />
        </div>
        <div>
          <label>Password</label>
          <Field name="password" component="input" type="text" />
        </div>
        <button type="submit">Submit</button>
        {this.renderAlert()}
      </form>
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
