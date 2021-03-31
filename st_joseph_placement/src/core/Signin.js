import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [values, setValues] = useState({
    "Primary Email ID": "sivashankar1326@gmail.com",
    password: "siva",
    didRedirect: false,
  });
  //destructing the state variables
  const { password, didRedirect } = values;

  //boolean value is returned
  const { student } = isAuthenticated();

  //storing the state value
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //signin button is clicked
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    //passing to index.js in auth/helper
    signin({ "Primary Email ID": values["Primary Email ID"], password })
      .then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //Signin is success and checking whether user or admin
  const performRedirect = () => {
    if (isAuthenticated()) {
      if (didRedirect) {
        if (student && student.role === 1) {
          return <Redirect to="/admin/home" />;
        } else {
          return <Redirect to="/student/home" />;
        }
      }
    }
  };
  const SigninForm = () => {
    return (
      <form className="p-2">
        <div className="form-group">
          <label>Email*</label>
          <input
            type="text"
            className="form-control"
            value={values["Primary Email ID"]}
            onChange={handleChange("Primary Email ID")}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label>Password*</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="btn btn-block btn-warning mt-4 mb-3"
          onClick={onSubmit}
        >
          Submit
        </button>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {performRedirect()}
      </form>
    );
  };

  return <div>{SigninForm()}</div>;
};
export default Signin;
