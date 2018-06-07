import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../Actions/auth";

class LoginForm extends Component {
  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  handleFormSubmit = ({ username, email, password }) => {
    console.log(username, email, password);
    const { history } = this.props;
    this.props.login(username, email, password, history);
  };

  render() {
    console.log("this.props", this.props);
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div>
          <label>Username</label>
          <Field name="username" component="input" type="text" />
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
    authenticated: state.auth.authenticated
  };
};

LoginForm = connect(
  mapStateToProps,
  { login }
)(LoginForm);

export default reduxForm({
  form: "login",
  fields: ["username", "email", "password"]
})(LoginForm);
