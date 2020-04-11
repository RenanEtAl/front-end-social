import React from "react";
import Posts from "../../post/Posts.page";
import "./Home.styles.css";
import Jumbotron from "../jumbotron-header.component";
const Home = () => (
  <div>
    <Jumbotron />
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
