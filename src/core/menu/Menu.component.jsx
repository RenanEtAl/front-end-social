import React from "react";
// withRouter takes another component as an argument
// higher order router
// gains access to props, "history" in this case
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";
import "./Menu.styles.css";

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return { color: "#C51F5D", borderBottomColor: "#C51F5D" };
  else return { color: "#ffffff" };
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary menu-bg justify-content-end">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/users")}
          to="/users"
        >
          Users
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to={`/post/create`}
          style={isActive(history, `/post/create`)}
          className="nav-link"
        >
          Create Post
        </Link>
      </li>

      {!isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign up
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign in
            </Link>
          </li>
        </>
      )}

      {isAuthenticated() && (
        <>
          <li className="nav-item">
            <Link
              to={`/findpeople`}
              style={isActive(history, `/findpeople`)}
              className="nav-link"
            >
              DISCOVER
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={`/user/${isAuthenticated().user._id}`}
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              className="nav-link"
            >
              {`${isAuthenticated().user.name}'s profile`}
            </Link>
          </li>

          <li className="nav-item">
            <span
              className="nav-link"
              style={
                (isActive(history, "/signout"),
                {
                  cursor: "pointer",
                  color: "#fff",
                })
              }
              onClick={() => signout(() => history.push("/"))}
            >
              Sign out
            </span>
          </li>
        </>
      )}

      {isAuthenticated() && isAuthenticated().user.role === "admin" && (
        <li className="nav-item">
          <Link
            to={`/admin`}
            style={isActive(history, `/admin`)}
            className="nav-link"
          >
            Admin
          </Link>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
