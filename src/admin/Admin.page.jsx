import React, { Component } from "react";
import Posts from "../post/Posts.page";
import Users from "../user/Users.component";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

export default class Admin extends Component {
  state = {
    redirectToHome: false
  };

  componentDidMount() {
    if (isAuthenticated().user.role !== "admin") {
      this.setState({ redirectToHome: true });
    }
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div>
          <div className="jumbotron">
            <h2>Admin Dashboard</h2>
            <p className="lead">Welcome!</p>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <h2>Posts</h2>
                <hr />
                <Posts />
              </div>
              <div className="col-md-6">
                <h2>Current Users</h2>
                <hr />
                <Users />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
