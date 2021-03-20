import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";

//self Explanatory
import Footer from "../template/Footer";
import Menu from "../template/Menu";

//For creating a new internship docs in DB
import { createInternship } from "./helper/StudentapiCalls";

//For the Success/Error Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//To redirect to Home Page once the upload is success
import { Redirect } from "react-router-dom";

//For getting Admin permission to Submit the Course
import { getToggleDetails } from "../AdminView/helper/Adminapicalls";

const Internship = () => {
  //to redirect to homepage
  const [redirect, setRedirect] = useState(false);

  //field will be disabled or not based on admin permission
  const [disabled, setDisabled] = useState(false);

  //Internship Object
  const [internshipInfo, setInternshipInfo] = useState({
    jobname: "",
    organizationname: "",
    duration: "",
    location: "",
    From: "",
    To: "",
    formData: new FormData(),
  });

  //Destructing the Object
  const {
    jobname,
    organizationname,
    duration,
    location,
    From,
    To,
    formData,
  } = internshipInfo;

  //Getting the admin permission
  useEffect(() => {
    getToggleDetails().then((data) => {
      const { intern } = data;
      setDisabled(!intern);
    });
  }, []);

  //Getting student details and token from Local Storage
  const { student, token } = isAuthenticated();

  //handling input
  const handleChange = (name) => (event) => {
    const value =
      name === "certificate" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setInternshipInfo({ ...internshipInfo, [name]: value });
  };

  //Handling form submission
  const onSubmit = (event) => {
    event.preventDefault();

    //adding user key in formData
    formData.set("user", student._id);

    //Backend call for inserting the docs
    createInternship(student._id, token, formData)
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success(data.message);
          setInternshipInfo({
            ...internshipInfo,
            jobname: "",
            organizationname: "",
            duration: "",
            location: "",
            formData: new FormData(),
          });
          setTimeout(() => setRedirect(true), 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  //redirecting to home page
  if (redirect) <Redirect to="/student/home" />;

  return (
    <div className="container-fluid">
      <Menu />

      {/* The Form  */}
      <form className=" container shadow-lg my-5 p-4">
        <div className="form-group ">
          <label className="text-white">Job Name *</label>
          <input
            className="form-control"
            placeholder="Eg: Graphic Designer"
            value={jobname}
            onChange={handleChange("jobname")}
          />
        </div>
        <div className="form-group ">
          <label className="text-white">Organization Name *</label>
          <input
            className="form-control"
            placeholder="Eg: CISCO"
            value={organizationname}
            onChange={handleChange("organizationname")}
          />
        </div>

        <div className="form-group">
          <label className="text-white">Duration *</label>
          <input
            type="text"
            placeholder="Eg: 5 days or 2 weeks"
            className="form-control"
            value={duration}
            onChange={handleChange("duration")}
          />
        </div>
        <div className="form-group">
          <label className="text-white">Location *</label>
          <input
            type="text"
            placeholder="Eg: Chennai"
            className="form-control"
            value={location}
            onChange={handleChange("location")}
          />
        </div>
        <div className="form-group">
          <label className="text-white">From Date *</label>
          <input
            type="text"
            name="duration"
            placeholder="Eg: 10/10/2021"
            className="form-control"
            onChange={handleChange("From")}
            value={From}
          />
        </div>
        <div className="form-group">
          <label className="text-white">To Date *</label>
          <input
            type="text"
            name="duration"
            placeholder="Eg: 10/10/2021"
            className="form-control"
            onChange={handleChange("To")}
            value={To}
          />
        </div>
        <div className="form-group">
          <label className="text-white">Certificate *</label>

          <input
            type="file"
            name="certificate"
            placeholder="choose a file"
            className="form-control"
            onChange={handleChange("certificate")}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <button
          type="submit"
          className="btn btn-block btn-warning "
          onClick={onSubmit}
          disabled={disabled}
        >
          Submit
        </button>
      </form>

      {/* Required for toast messages */}
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

      <div className="my-4">
        <Footer />
      </div>
    </div>
  );
};

export default Internship;
