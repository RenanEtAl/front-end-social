import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../assets/user.png";
import DeleteUser from "./DeleteUser.component";
import FollowProfileButton from "./FollowProfileButton.component";
import ProfileTabs from "./ProfileTabs.component";
import { listByUser } from "../post/apiPost";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: [],
    };
  }

  // check follow
  checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        // alter the following value to either follow or unfollow
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  // runs when the entire component mounts
  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        // user is not authenticated, ask them to sign in
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data); // will return true or false
        this.setState({ user: data, following: following });
        // get the user's posts
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = (userId) => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  // grab the props from backend using userId
  componentDidMount() {
    //console.log("user id from route params: ", this.props.match.params.userId)
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  //
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    //const redirectToSignin = this.state.redirectToSignin

    const { redirectToSignin, user, posts } = this.state;
    // if there's an error redirect user to signin
    if (redirectToSignin) return <Redirect to="/signin" />;

    // if user has image show it
    // else show the default image
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{user.name}'s Profile</h2>
        <div className="row">
          <div className="col-md-4">
            <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={(index) => (index.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
          </div>

          <div className="col-md-8">
            <div className="lead mt-2">
              <p>Hello, this is {user.name}!</p>
              <p>Email: {user.email}</p>
              <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
            </div>
            {isAuthenticated().user &&
            isAuthenticated().user._id === user._id ? (
              <div className="d-inline-block">
                <Link
                  className="btn btn-raised btn-dark mr-5"
                  to={`/post/create`}
                >
                  Create Post
                </Link>
                <Link
                  className="btn btn-raised btn-dark mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser />
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}

            <div>
              {isAuthenticated().user &&
                isAuthenticated().user.role === "admin" && (
                  <div class="card mt-5">
                    <div className="card-body">
                      <h5 className="card-title">Admin</h5>
                      <p className="mb-2 text-danger">
                        Edit/Delete as an Admin
                      </p>
                      <Link
                        className="btn btn-raised btn-dark mr-5"
                        to={`/user/edit/${user._id}`}
                      >
                        Edit Profile
                      </Link>
                      <DeleteUser userId={user._id} />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />

            <hr />
            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}
