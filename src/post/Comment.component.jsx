import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../assets/user.png";

export default class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  handleChange = (event) => {
    // clear error
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0 || text.length > 150) {
      this.setState({ error: "Comment should be between 1 to 150 characters" });
      return false;
    }
    return true;
  };
  addComment = (event) => {
    // it will not reload when submit is clicked
    event.preventDefault();

    if (!isAuthenticated()) {
      this.setState({ error: "Please signin to leave a comment" });
      return false; // so the code does not executed
    }

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;
      // wrap text in object and give it as a value of text
      // because of the way it's implemented in the backend
      comment(userId, token, postId, { text: this.state.text }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          // clear comment
          this.setState({ text: "" });
          // dispatch fresh list of comments to parent (SinglePost)
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    uncomment(userId, token, postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    const { comments } = this.props;
    const { error } = this.state;

    return (
      <div>
        <h2 className="mt-5 mb-5">leave comment</h2>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              value={this.state.text}
              onChange={this.handleChange}
              placeholder="Speak your mind..."
            />

            <button className="btn btn-raised mt-2 btn-dark">
              Post Comment
            </button>
          </div>
        </form>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <hr />

        {
          <div className="col-md-8-offset-2">
            <h3 className="text-primary">{comments.length} Comments</h3>
            <hr />
            {comments.map((comment, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${comment.postedBy._id}`}>
                    <img
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                      alt={comment.postedBy.name}
                    />
                  </Link>
                  <div>
                    <p className="lead">{comment.text}</p>
                    <p className="font-italic mark">
                      Posted by{" "}
                      <Link to={`/user/${comment.postedBy._id}`}>
                        {comment.postedBy.name}{" "}
                      </Link>
                      on {new Date(comment.created).toDateString()}
                      <span>
                        {isAuthenticated().user &&
                          isAuthenticated().user._id ===
                            comment.postedBy._id && (
                            <>
                              <button
                                onClick={() => this.deleteConfirmed(comment)}
                                className="btn btn-raised btn-warning float-right mr-1"
                              >
                                Delete Comment
                              </button>
                            </>
                          )}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}
