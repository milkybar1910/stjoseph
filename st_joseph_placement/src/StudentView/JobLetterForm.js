import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";

//self Explanatory
import Footer from "../template/Footer";
import Menu from "../template/Menu";

//For creating a new jobLetter docs in DB
import { createJob } from "./helper/StudentapiCalls";

//For the Success/Error Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//To redirect to Home Page once the upload is success
import { Redirect } from "react-router-dom";

//For Input Type SELECT
import Select from "react-select";

//For getting Admin permission to Submit the Course
import { getToggleDetails } from "../AdminView/helper/Adminapicalls";

const JobLetterForm = () => {
  //to redirect to homepage
  const [redirect, setRedirect] = useState(false);

  //field will be disabled or not based on admin permission
  const [disabled, setDisabled] = useState(false);

  //JobLetter Object
  const [jobInfo, setJobInfo] = useState({
    jobtitle: "",
    organizationname: "",
    salary: "",
    DateOfJoining: "",
    OnCampusOrOffCampus: "",
    formData: new FormData(),
  });

  //Destructing the Object
  const {
    jobtitle,
    organizationname,
    formData,
    salary,
    DateOfJoining,
  } = jobInfo;

  //Getting student details and token from Local Storage
  const { student, token } = isAuthenticated();

  //handling input
  const handleChange = (name) => (event) => {
    const value =
      name === "certificate"
        ? event.target.files[0]
        : name === "OnCampusOrOffCampus"
        ? event.value
        : event.target.value;
    formData.set(name, value);
    setJobInfo({ ...jobInfo, [name]: value });
  };

  //Handling form submission
  const onSubmit = (event) => {
    event.preventDefault();

    //adding user key in formData
    formData.set("user", student._id);

    //Backend call for inserting the docs
    createJob(student._id, token, formData)
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success(data?.message);
          setJobInfo({
            ...jobInfo,
            jobtitle: "",
            organizationname: "",
            salary: "",
            certificate: "",
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
      const { joboffer } = data;
      setDisabled(!joboffer);
    });
  }, []);

  //redirecting to home page
  if (redirect) return <Redirect to="/student/home" />;

  return (
    <div className="container-fluid">
      <Menu />

      {/* The Form  */}
      <form className=" container shadow-lg mt-5 p-4 mb-5">
        <div className="form-group ">
          <label className="text-white">Job Title *</label>
          <input
            className="form-control"
            placeholder="Eg: Software Developer"
            value={jobtitle}
            onChange={handleChange("jobtitle")}
          />
        </div>
        <div className="form-group ">
          <label className="text-white">Organization Name * </label>
          <input
            className="form-control"
            placeholder="Eg: PanTech "
            value={organizationname}
            onChange={handleChange("organizationname")}
          />
        </div>
        <div className="form-group ">
          <label className="text-white">Salary *</label>
          <input
            className="form-control"
            placeholder="Eg: 4 or 4.5 "
            value={salary}
            onChange={handleChange("salary")}
          />
        </div>
        <div className="form-group">
          <label className="text-white">Date Of Joining *</label>
          <input
            type="text"
            name="duration"
            placeholder="Eg: 10/10/2021"
            className="form-control"
            onChange={handleChange("DateOfJoining")}
            value={DateOfJoining}
          />
        </div>
        <div className="form-group">
          <label className="text-white">On Campus or Off Campus *</label>
          <Select
            options={[
              { value: "On Campus", label: "On Campus" },
              { value: "Off Campus", label: "Off Campus" },
            ]}
            onChange={handleChange("OnCampusOrOffCampus")}
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
            accept=".pdf"
          />
        </div>
        <button
          type="submit"
          className="btn btn-block btn-warning  "
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

export default JobLetterForm;
