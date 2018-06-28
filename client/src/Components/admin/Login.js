import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../Actions/auth";
import "../css/SignIns.css";

class LoginForm extends Component {
  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  handleFormSubmit = ({ username, password }) => {
    const { history } = this.props;
    this.props.login(username, password, history);
  };

  render() {
    console.log("this.props", this.props);
    const { handleSubmit } = this.props;

    return (
      <div className="form-container">
        <div className="signins-title">Log In</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <label>Username</label>
          <div>
            <Field name="username" component="input" type="text" />
          </div>
          <label>Password</label>
          <div>
            <Field name="password" component="input" type="text" />
          </div>
          <button className="submit" type="submit">
            Submit
          </button>
          {this.renderAlert()}
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

LoginForm = connect(
  mapStateToProps,
  { login }
)(LoginForm);

export default reduxForm({
  form: "login",
  fields: ["username", "password"]
})(LoginForm);
