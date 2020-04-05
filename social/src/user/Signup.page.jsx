import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
class Signup extends Component {
  // state to hold and store the value
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      // successful message
      open: false,
      recaptcha: false,
    };
  }
  // higher order function
  // event is for the onChange event
  handleChange = (name) => (event) => {
    // this will handle the name, email, password
    // whenever the user types new text on the field the error message goes away
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name: name,
      email: email,
      password: password,
    };
    // console.log(user);
    if (this.state.recaptcha) {
      signup(user).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else
          this.setState({
            error: "",
            name: "",
            email: "",
            password: "",
            open: true,
          });
      });
    } else {
      this.setState({
        error: "What day is today? Please write a correct answer!",
      });
    }
  };

  recaptchaHandler = (e) => {
    this.setState({ error: "" });
    let userDay = e.target.value.toLowerCase();
    let dayCount;

    if (userDay === "sunday") {
      dayCount = 0;
    } else if (userDay === "monday") {
      dayCount = 1;
    } else if (userDay === "tuesday") {
      dayCount = 2;
    } else if (userDay === "wednesday") {
      dayCount = 3;
    } else if (userDay === "thursday") {
      dayCount = 4;
    } else if (userDay === "friday") {
      dayCount = 5;
    } else if (userDay === "saturday") {
      dayCount = 6;
    }

    if (dayCount === new Date().getDay()) {
      this.setState({ recaptcha: true });
      return true;
    } else {
      this.setState({
        recaptcha: false,
      });
      return false;
    }
  };

  signupForm = (name, email, password, recaptcha) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">
          {recaptcha ? "Correct!" : "What day is today?"}
        </label>

        <input
          onChange={this.recaptchaHandler}
          type="text"
          className="form-control"
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-dark">
        Submit
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, open, recaptcha } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign Up</h2>
        <p className="mt-5 mb-5">Create your account!</p>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          Your account has been successfully created. Please{" "}
          <Link to="/signin"> Sign In</Link> to your new account!
        </div>

        {this.signupForm(name, email, password, recaptcha)}
      </div>
    );
  }
}

export default Signup;
