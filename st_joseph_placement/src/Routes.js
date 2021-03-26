import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminHome from "./AdminView/AdminHome";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import MainPage from "./core/MainPage";
import Internship from "./StudentView/Internships";
import Workshops from "./StudentView/Workshops";
import Profile from "./StudentView/Profile";
import StudentHome from "./StudentView/StudentHome";
import Courses from "./StudentView/Courses";
import JobLetterForm from "./StudentView/JobLetterForm";
import Batch from "./AdminView/Batch";
import Forms from "./AdminView/Forms";
import Notifications from "./StudentView/Notifications";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <PrivateRoute path="/student/profile" exact component={Profile} />
          <PrivateRoute path="/student/home" exact component={StudentHome} />
          <PrivateRoute
            path="/student/dashboard"
            exact
            component={StudentHome}
          />
          <PrivateRoute
            path="/student/internship"
            exact
            component={Internship}
          />
          <PrivateRoute path="/student/workshops" exact component={Workshops} />
          <PrivateRoute
            path="/student/onlinecourses"
            exact
            component={Courses}
          />
          <PrivateRoute
            path="/student/joboffers"
            exact
            component={JobLetterForm}
          />
          <PrivateRoute
            path="/student/notifications"
            exact
            component={Notifications}
          />
          <AdminRoute path="/admin/home" exact component={AdminHome} />
          <AdminRoute path="/admin/dashboard" exact component={AdminHome} />
          <AdminRoute path="/admin/batch" exact component={Batch} />
          <AdminRoute path="/admin/forms" exact component={Forms} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
