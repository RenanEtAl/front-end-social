import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import DefaultProfile from "../assets/user.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Jumbotron from "../core/jumbotron-header.component";

export default class FollowOtherUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      open: false,
    };
  }

  componentDidMount() {
    // list the userrs
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  clickFollow = (user, index) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(index, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `You are now following ${user.name}.`,
        });
      }
    });
  };

  renderUsers = (users) => (
    <div className="row">
      {this.state.users.map((user, index) => (
        <div className="col-lg-4 col-md-12 mb-4" key={index}>
          <img
            style={{ height: "200px", width: "100%" }}
            className="img-thumbnail mb-3"
            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
            onError={(index) => (index.target.src = `${DefaultProfile}`)}
            alt={user.name}
          />

          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
            <Link
              to={`/user/${user._id}`}
              className="btn btn-raised btn-dark btn-sm"
            >
              View Profile
            </Link>

            <button
              onClick={() => this.clickFollow(user, index)}
              className="btn btn-raised btn-dark float-right btn-sm"
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users, open, followMessage } = this.state;
    return (
      <div>
        <Jumbotron />
        <div className="container">
          <h2 className="mt-5 mb-5">Follow Other Users</h2>
          {open && (
            <div className="alert alert-success">
              {open && <p>{followMessage}</p>}
            </div>
          )}
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}
