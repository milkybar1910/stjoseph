import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, signin, signup } from "../auth/helper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [values, setValues] = useState({
    "Register Number": "",
    "Roll Number": "",
    "Primary Email ID": "",
    password: "",
    "Year Of Admission": "",
    didRedirect: false,
  });

  const { password, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });
    signup({
      "Register Number": values["Register Number"],
      "Roll Number": values["Roll Number"],
      "Primary Email ID": values["Primary Email ID"],
      password,
      "Year Of Admission": values["Year Of Admission"],
    })
      .then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else {
          signin({
            "Primary Email ID": data["Primary Email ID"],
            password,
          }).then((data) => {
            toast.success("Registration Success");
            setTimeout(() => {
              authenticate(data, () => {
                setValues({
                  ...values,
                  didRedirect: true,
                });
              });
            }, 1000);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const SignUpForm = () => {
    return (
      <form className="p-2">
        <div className="form-group">
          <label>Register Number*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Eg:312418205087"
            value={values["Register Number"]}
            onChange={handleChange("Register Number")}
          />
        </div>
        <div className="form-group">
          <label>Roll Number*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Eg:18IT1209"
            value={values["Roll Number"]}
            onChange={handleChange("Roll Number")}
          />
        </div>
        <div className="form-group">
          <label>Year Of Admission*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Eg:2018"
            value={values["Year Of Admission"]}
            onChange={handleChange("Year Of Admission")}
          />
        </div>

        <div className="form-group">
          <label>Email address*</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Eg:robert123@gmail.com"
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
            value={password}
            onChange={handleChange("password")}
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
      </form>
    );
  };

  //TODO:
  const SubmitSuccess = () => {
    if (didRedirect) return <Redirect to="/student/home" />;
  };

  return (
    <div>
      {SignUpForm()}
      {SubmitSuccess()}
    </div>
  );
};
export default Signup;
