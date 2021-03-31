import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import {
  getNotifications,
  getStudentForNotifications,
} from "../StudentView/helper/StudentapiCalls";

import "../style.css";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#FFFFFF" };
  } else {
    return { color: "" };
  }
};
const Menu = ({ history, length = 0 }) => {
  const { student } = isAuthenticated();

  const RegisterNumber = student["Register Number"];
  const role = student.role;

  const [notification, setNotification] = useState(0);

  useEffect(() => {
    const { student, token } = isAuthenticated();

    const getNotified = (studentPropertiesColumn) => {
      return getNotifications(student["Year Of Admission"])
        .then((data) => {
          let result = data.result.filter((data) => {
            return studentPropertiesColumn.includes(data._id) === false;
          });
          setNotification(result.length);
        })
        .catch((err) => console.log(err));
    };
    async function StudentNotification() {
      let studentCols = await getStudentForNotifications(
        student._id,
        token
      ).then((data) => data);
      return getNotified(studentCols);
    }
    StudentNotification();
  }, [length]);

  const UserDashboard = () => {
    return (
      <Fragment>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/student/home")}
            to="/student/home"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/student/internship")}
            to="/student/internship"
          >
            Intership
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/student/workshops")}
            to="/student/workshops"
          >
            Workshop
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/student/onlinecourses")}
            to="/student/onlinecourses"
          >
            Course
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/student/joboffers")}
            to="/student/joboffers"
          >
            Job Offer
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/student/notifications")}
            to="/student/notifications"
          >
            Notifications
            {notification ? (
              <span className="badge badge-warning mx-1">{notification}</span>
            ) : (
              <></>
            )}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/student/profile")}
            to="/student/profile"
          >
            Profile
          </Link>
        </li>
      </Fragment>
    );
  };

  const AdminDashboard = () => {
    return (
      <Fragment>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/admin/home")}
            to="/admin/home"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/admin/batch")}
            to="/admin/batch"
          >
            Batch
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link mx-2"
            style={currentTab(history, "/admin/forms")}
            to="/admin/forms"
          >
            Forms
          </Link>
        </li>
      </Fragment>
    );
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-darkblack ">
      {role === 1 && (
        <a className="navbar-brand brand_style p-2 h4" href="/admin/home">
          <span className="font-weight-bold">{RegisterNumber}</span>
        </a>
      )}
      {role === 0 && (
        <a className="navbar-brand brand_style p-2 h4" href="/student/home">
          <span className="font-weight-bold">{RegisterNumber}</span>
        </a>
      )}

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse bg-darkblack "
        id="navbarTogglerDemo03"
      >
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0  ">
          {role === 0 && <UserDashboard />}
          {role === 1 && <AdminDashboard />}

          <li className="nav-item">
            <span
              className="nav-link mx-2 text-warning"
              style={{ cursor: "pointer" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Menu);
