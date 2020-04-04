import React, { Component } from "react";
import { forgotPassword } from "../auth";
export default class ForgotPassword extends Component {
  state = {
    email: "",
    message: "",
    error: ""
  };

  forgotPassword = e => {
    e.preventDefault();
    this.setState({ message: "", error: "" });
    forgotPassword(this.state.email).then(data => {
      if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error });
      } else {
        console.log(data.message);
        this.setState({ message: data.message });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Password Reset</h2>

        {this.state.message && (
          <h4 className="bg-header">{this.state.message}</h4>
        )}
        {this.state.error && <h4 className="bg-warning">{this.state.error}</h4>}

        <form>
          <div>
            <input
              type="email"
              className="form-control mt-5"
              placeholder="Your email address"
              value={this.state.email}
              name="email"
              onChange={event =>
                this.setState({
                  email: event.target.value,
                  message: "",
                  error: ""
                })
              }
              autoFocus
            />
          </div>
          <button
            onClick={this.forgotPassword}
            className="btn btn-raised btn-primary"
          >
            Send Password Reset Link
          </button>
        </form>
      </div>
    );
  }
}
