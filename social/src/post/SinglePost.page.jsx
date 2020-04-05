import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import { Link, Redirect } from "react-router-dom";
import DefaultPost from "../assets/placeholder.png";
import { isAuthenticated } from "../auth";
import Comment from "./Comment.component";
import SpinnerPage from "../core/spinner.component";

export default class SinglePost extends Component {
  state = {
    post: "",
    redirectToHome: false,
    // if the user has liked a false
    like: false,
    likes: 0,
    redirectToSignin: false,
    comments: [],
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("COMMENTING USER IN SINGLE POST", data);
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments,
        });
      }
    });
  };

  checkLike = (likes) => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    // indexOf method returns -1 if the userId is not found in the likes array
    // match is true if found, else false
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your post?");
    if (answer) {
      this.deletePost();
    }
  };
  // put request to the backend
  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    // if the state is true, send PUT request unlike, otherwise send like
    let callApi = this.state.like ? unlike : like;

    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  };
  updateComments = (comments) => {
    this.setState({ comments });
  };

  renderPost = (post) => {
    // when the name is clicked, take to the user profile
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    const { like, likes } = this.state;
    return (
      <div className="card-body">
        <img
          src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
          alt={post.title}
          onError={(index) => (index.target.src = `${DefaultPost}`)}
          className="img-fluid md-8 mb-3"
          style={{ height: "auto", maxWidth: "100%" }}
        />
        {like ? (
          <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-thumbs-up text-success"
              style={{ padding: "10px", borderRadius: "50%" }}
            />{" "}
            {likes} Like
          </h3>
        ) : (
          <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-thumbs-up text-warning"
              style={{ padding: "10px", borderRadius: "50%" }}
            />{" "}
            {likes} Like
          </h3>
        )}

        <p className="card-text">{post.body}</p>
        <br />
        <p className="font-italic mark">
          Posted by <Link to={`${posterId}`}>{posterName} </Link>
          on {new Date(post.created).toDateString()}
        </p>
        <div className="d-inline-block">
          <Link
            to={`/`}
            className="btn-dark btn-raised btn-primary btn-sm mr-5"
          >
            Back to posts
          </Link>

          {isAuthenticated().user &&
            isAuthenticated().user._id === post.postedBy._id && (
              <>
                <Link
                  to={`/post/edit/${post._id}`}
                  className="btn btn-dark btn-raised btn-primary btn-sm mr-5"
                >
                  Update Post
                </Link>
                <button
                  onClick={this.deleteConfirmed}
                  className="btn btn-raised btn-danger mr-5"
                >
                  Delete Post
                </button>
              </>
            )}
          <div>
            {isAuthenticated().user && isAuthenticated().user.role === "admin" && (
              <div class="card mt-5">
                <div className="card-body">
                  <h5 className="card-title">Admin</h5>
                  <p className="mb-2 text-danger">Edit/Delete as an Admin</p>
                  <Link
                    to={`/post/edit/${post._id}`}
                    className="btn btn-raised btn-warning btn-sm mr-5"
                  >
                    Update Post
                  </Link>
                  <button
                    onClick={this.deleteConfirmed}
                    className="btn btn-raised btn-danger"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { post, redirectToHome, redirectToSignin, comments } = this.state;

    if (redirectToHome) {
      return <Redirect to={`/`} />;
    } else if (redirectToSignin) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div className="container">
        <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
        {!post ? (
          <div className="jumbotron text-center">
            <SpinnerPage />
          </div>
        ) : (
          this.renderPost(post)
        )}

        <Comment
          postId={post._id}
          comments={comments.reverse()}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}
