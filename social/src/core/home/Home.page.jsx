import React from "react";
import Posts from "../../post/Posts.page";
import "./Home.styles.css";
const Home = () => (
  <div>
    <div className="jumbotron jumbotron-bg">
      <h2>Not Twitter</h2>
      <p className="lead">Yours to discover</p>
    </div>

    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
