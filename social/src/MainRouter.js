import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/home/Home.page";
import Signup from "./user/Signup.page";
import Signin from "./user/Signin.page";
import Menu from "./core/menu/Menu.component";
import Profile from "./user/Profile.page";
import Users from "./user/Users.component";
import EditProfile from "./user/EditProfile.page";
import PrivateRoute from "./auth/PrivateRoute";
import FollowOtherUsers from "./user/FollowOtherUsers.page";
import NewPost from "./post/NewPost.page";
import SinglePost from "./post/SinglePost.page";
import EditPost from "./post/EditPost.page";
import ForgotPassword from "./user/ForgotPassword.page";
import ResetPassword from "./user/ResetPassword.page";
import Admin from "./admin/Admin.page";
// works like a wrapper for the entire component

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <PrivateRoute exact path="/admin" component={Admin} />
      <PrivateRoute exact path="/post/create" component={NewPost} />
      <Route exact path="/post/:postId" component={SinglePost}></Route>
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
      <Route exact path="/users" component={Users}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/signin" component={Signin}></Route>
      <Route exact path="/forgot-password" component={ForgotPassword}></Route>
      <Route
        exact
        path="/reset-password/:resetPasswordToken"
        component={ResetPassword}
      ></Route>
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
      <PrivateRoute exact path="/findpeople/" component={FollowOtherUsers} />
    </Switch>
  </div>
);

export default MainRouter;
