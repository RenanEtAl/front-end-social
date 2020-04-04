import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
import DefaultProfile from "../images/avatar.png";

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false
    };
  }
  // grab the props from backend using userId
  componentDidMount() {
    this.postData = new FormData();
    // grab user info
    this.setState({ user: isAuthenticated().user });
  }

  // client side validation
  isValid = () => {
    const { title, body, fileSize } = this.state;
    // if file size is > 1mb
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    // if no user input
    if (title.length === 0 || body.length === 0) {
      this.setState({
        error: "Title and body are both required",
        loading: false
      });
      return false;
    }

    return true;
  };
  // higher order function
  // event is for the onChange event
  handleChange = name => event => {
    this.setState({ error: "" });
    // grab the file input
    // this will handle the name, email, password
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    // populate the user data
    this.postData.set(name, value);
    this.setState({ [name]: value, fileSize: fileSize });
  };
  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      // create post
      create(userId, token, this.postData)
        // get response from update method
        .then(data => {
          if (data.error) this.setState({ error: data.error });
          else {
            // clear the old fields
            this.setState({
              loading: false,
              title: "",
              body: "",
              photo: "",
              redirectToProfile: true
            });
          }
        });
    }
  };

  newPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Upload Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea
          onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          value={body}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-dark">
        Create Post
      </button>
    </form>
  );

  render() {
    const {
      title,
      body,
      photo,
      user,
      loading,
      error,
      redirectToProfile
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create a new post</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        {this.newPostForm(title, body)}
      </div>
    );
  }
}
