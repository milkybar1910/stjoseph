import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";

//self Explanatory
import Menu from "../template/Menu";
import Footer from "../template/Footer";

//For creating a new workshop docs in DB
import { createWorkshop } from "./helper/StudentapiCalls";

//For the Success/Error Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//To redirect to Home Page once the upload is success
import { Redirect } from "react-router-dom";

//For getting Admin permission to Submit the Course
import { getToggleDetails } from "../AdminView/helper/Adminapicalls";

const Workshops = () => {
  //to redirect to homepage
  const [redirect, setRedirect] = useState(false);

  //field will be disabled or not based on admin permission
  const [disabled, setDisabled] = useState(false);

  //Workshop Object
  const [workshopInfo, setWorkshopInfo] = useState({
    "Course Name": "",
    "Organization Name": "",
    Duration: "",
    Date: "",
    formData: new FormData(),
  });

  //Destructing the Object
  const { Duration, Date, formData } = workshopInfo;

  //Getting student details and token from Local Storage
  const { student, token } = isAuthenticated();

  //handling input
  const handleChange = (name) => (event) => {
    const value =
      name === "Certificate" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setWorkshopInfo({ ...workshopInfo, [name]: value });
  };

  //Handling form submission
  const onSubmit = (event) => {
    event.preventDefault();

    //adding user key in formData
    formData.set("user", student._id);

    //Backend call for inserting the docs
    createWorkshop(student._id, token, formData)
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success(data.message);
          setWorkshopInfo({
            ...workshopInfo,
            "Course Name": "",
            "Organization Name": "",
            Duration: "",
            Certificate: "",
            Date: "",
            formData: new FormData(),
          });
          setTimeout(() => setRedirect(true), 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  //Getting the admin permission
  useEffect(() => {
    getToggleDetails().then((data) => {
      const { workshop } = data;
      setDisabled(!workshop);
    });
  }, []);

  //redirecting to home page
  if (redirect) return <Redirect to="/student/home" />;

  return (
    <div>
      <Menu />

      {/* The Form  */}
      <form className=" container shadow my-5 p-4">
        <div className="form-group ">
          <label className="text-white">Course Name *</label>
          <input
            className="form-control"
            placeholder="Eg: Android Development"
            value={workshopInfo["Course Name"]}
            onChange={handleChange("Course Name")}
          />
        </div>
        <div className="form-group ">
          <label className="text-white">Organization Name *</label>
          <input
            className="form-control"
            placeholder="Eg: PanTech "
            value={workshopInfo["Organization Name"]}
            type="text"
            onChange={handleChange("Organization Name")}
          />
        </div>
        <div className="form-group">
          <label className="text-white">Duration *</label>
          <input
            type="text"
            name="duration"
            placeholder="Eg: 5 days or 2 weeks"
            className="form-control"
            onChange={handleChange("Duration")}
            value={Duration}
          />
        </div>
        <div className="form-group">
          <label className="text-white">Date *</label>
          <input
            type="text"
            name="duration"
            placeholder="Eg:10/10/2000"
            className="form-control"
            onChange={handleChange("Date")}
            value={Date}
          />
        </div>
        <div className="form-group">
          <label className="text-white">Certificate *</label>
          <input
            type="file"
            name="photo"
            placeholder="choose a file"
            className="form-control"
            onChange={handleChange("Certificate")}
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <button
          type="submit"
          className="btn btn-block btn-warning font-weight-bold text-uppercase mt-4 "
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
      <div className="my-4 ">
        <Footer />
      </div>
    </div>
  );
};

export default Workshops;
