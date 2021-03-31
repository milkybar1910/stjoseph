import React, { useEffect, useState } from "react";
import Menu from "../template/Menu";

import { getToggleDetails, updateToggle } from "./helper/Adminapicalls";

import Toggle from "react-toggle";

import "react-toggle/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [profileToggle, setProfileToggle] = useState(false);
  const [internToggle, setInternToggle] = useState(false);
  const [workshopToggle, setWorkshopToggle] = useState(false);
  const [jobOfferToggle, setJobOfferToggle] = useState(false);
  const [courseToggle, setCourseToggle] = useState(false);

  const handleToggleChange = (name, toggleValue) => {
    updateToggle({ [name]: !toggleValue })
      .then((data) => {
        if (!data) {
          toast.error(data?.error);
        } else {
          toast.success(data.message);
          if (name === "profile") setProfileToggle(!toggleValue);
          if (name === "intern") setInternToggle(!toggleValue);
          if (name === "workshop") setWorkshopToggle(!toggleValue);
          if (name === "joboffer") setJobOfferToggle(!toggleValue);
          if (name === "course") setCourseToggle(!toggleValue);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getToggleDetails().then((data) => {
      const { intern, joboffer, profile, workshop, course } = data;

      setInternToggle(intern);
      setJobOfferToggle(joboffer);
      setProfileToggle(profile);
      setWorkshopToggle(workshop);
      setCourseToggle(course);
    });
  }, []);

  return (
    <div>
      <Menu />
      <div className="container">
        <div className="d-flex container my-4 ">
          <div className="mr-auto p-2 text-white my-auto">
            <h4 className="text-uppercase">PROFILE SUBMISSION</h4>
          </div>

          <div className="p-3">
            <Toggle
              id="cheese-status"
              onChange={() => handleToggleChange("profile", profileToggle)}
              checked={profileToggle}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex container my-4 ">
          <div className="mr-auto p-2 text-white my-auto">
            <h4 className="text-uppercase">INTERNSHIP SUBMISSION</h4>
          </div>
          <div className="p-3 ">
            <Toggle
              id="cheese-status"
              checked={internToggle}
              onChange={() => handleToggleChange("intern", internToggle)}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex container my-4 ">
          <div className="mr-auto p-2 text-white my-auto">
            <h4 className="text-uppercase">WORKSHOP SUBMISSION</h4>
          </div>
          <div className="p-3 ">
            <Toggle
              id="cheese-status"
              checked={workshopToggle}
              onChange={() => handleToggleChange("workshop", workshopToggle)}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex container my-4 ">
          <div className="mr-auto p-2 text-white my-auto">
            <h4 className="text-uppercase">ONLINE COURSE SUBMISSION</h4>
          </div>
          <div className="p-3 ">
            <Toggle
              id="cheese-status"
              checked={courseToggle}
              onChange={() => handleToggleChange("course", courseToggle)}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex container my-4 ">
          <div className="mr-auto p-2 text-white my-auto">
            <h4 className="text-uppercase">JOB OFFER SUBMISSION</h4>
          </div>
          <div className="p-3 ">
            <Toggle
              id="cheese-status"
              checked={jobOfferToggle}
              onChange={() => handleToggleChange("joboffer", jobOfferToggle)}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Home;
