import React, { Component } from "react";
import { list } from "./apiPost";
import DefaultPost from "../assets/placeholder.png";
import { Link } from "react-router-dom";
import SpinnerPage from "../core/spinner.component";

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1,
    };
  }

  loadPosts = (page) => {
    // list the users
    list(page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };
  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };
  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };
  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  renderPosts = (posts) => {
    return (
      <div className="row">
        {posts.map((post, index) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div className="col-lg-4 col-md-12 mb-4" key={index}>
              <div className="card-body">
                <img
                  src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={(index) => (index.target.src = `${DefaultPost}`)}
                  className="img-thumbnail mb-3"
                  style={{ height: "200px", width: "100%" }}
                />
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 75)}</p>
                <br />
                <p className="font-italic">
                  Posted by <Link to={`${posterId}`}>{posterName} </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-dark btn-sm"
                >
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          {!posts.length ? <SpinnerPage /> : "Recent Posts"}
        </h2>

        {this.renderPosts(posts)}

        {page > 1 ? (
          <button
            className="btn btn-raised btn-dark mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous Page ({this.state.page - 1})
          </button>
        ) : (
          ""
        )}

        {posts.length ? (
          <button
            className="btn btn-raised btn-dark mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next Page ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}
