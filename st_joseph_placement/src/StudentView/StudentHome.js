import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";

import Menu from "../template/Menu";
import { Link } from "react-router-dom";
// import Footer from "../template/Footer";

// Carousel Library
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

//Fetching the details
import {
  getCourse,
  getInternship,
  getJobInfo,
  getStudentDetails,
  getWorkshop,
  removeJob,
} from "./helper/StudentapiCalls";

//Removing Carousel info from DB
import { removeInternship } from "./helper/StudentapiCalls";
import { removeWorkshop } from "./helper/StudentapiCalls";
import { removeCourse } from "./helper/StudentapiCalls";

//Toast Message Library
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Image Handling
import ImageInternHelper from "./helper/ImageInternHelper";
import ImageWorkshopHelper from "./helper/ImageWorkshopHelper";
import ImageCourseHelper from "./helper/ImageCourseHelper";

import Pdfillustration from "../assets/svg/Pdfillustrations";

const StudentHome = () => {
  const [studentData, setStudentData] = useState({
    "Register Number": "",
  });
  const [internshipInfo, setInternshipInfo] = useState([]);
  const [workshopInfo, setWorkshopInfo] = useState([]);
  const [courseInfo, setCourseInfo] = useState([]);
  const [jobInfo, setJobInfo] = useState([]);

  const [reload, setReload] = useState(false);

  //Internship details are fetched from DB
  const fetchInternshipDetails = (studentID, token) => {
    getInternship(studentID, token)
      .then((data) => {
        setInternshipInfo(data);
      })
      .catch((err) => console.log(err));
  };

  //Workshop details are fetched from DB
  const fetchWorkshopDetails = (studentID, token) => {
    getWorkshop(studentID, token)
      .then((data) => {
        setWorkshopInfo(data);
      })
      .catch((err) => console.log(err));
  };

  //Course details are fetched from DB
  const fetchCourseDetails = (studentID, token) => {
    getCourse(studentID, token)
      .then((data) => {
        setCourseInfo(data);
      })
      .catch((err) => console.log(err));
  };

  //Job letter details are fetched from DB
  const fetchJobLetterDetails = (studentID, token) => {
    getJobInfo(studentID, token)
      .then((data) => {
        setJobInfo(data);
      })
      .catch((err) => console.log(err));
  };

  //Students details are fetched from DB
  const fetchStudentDetails = (studentID, token) => {
    getStudentDetails(studentID, token)
      .then((data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          setStudentData({
            ...studentData,
            "Register Number": data["Register Number"],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //REMOVING THE INTERNSHIP FROM FRONTEND
  const removeInternshipFromFront = (id) => {
    removeInternship(id).then((data) => {
      if (data?.error) {
        toast.error("Failed to Delete");
      } else {
        toast.success("Deleted Successfully");
        setInternshipInfo(internshipInfo.filter((item) => item._id !== id));
        setReload(!reload);
      }
    });
  };

  //REMOVING THE WORKSHOP FROM FRONTEND
  const removeWorkshopFromFront = (id) => {
    removeWorkshop(id).then((data) => {
      if (data?.error) {
        toast.error("Failed to Delete");
      } else {
        toast.success("Deleted Successfully");
        setWorkshopInfo(workshopInfo.filter((item) => item._id !== id));
        setReload(!reload);
      }
    });
  };

  //REMOVING THE COURSE FROM FRONTEND
  const removeCourseFromFront = (id) => {
    removeCourse(id).then((data) => {
      if (data?.error) {
        toast.error("Failed to Delete");
      } else {
        toast.success("Deleted Successfully");
        setCourseInfo(courseInfo.filter((item) => item._id !== id));
        setReload(!reload);
      }
    });
  };

  //REMOVING THE JOB LETTER FROM FRONG
  const removeJobFromFront = (id) => {
    removeJob(id).then((data) => {
      if (data?.error) {
        toast.error("Failed to Delete");
      } else {
        toast.success("Deleted Successfully");
        setJobInfo(jobInfo.filter((item) => item._id !== id));
        setReload(!reload);
      }
    });
  };

  //Pre Loading
  useEffect(() => {
    const { student, token } = isAuthenticated();
    fetchStudentDetails(student._id, token);
    fetchInternshipDetails(student._id, token);
    fetchWorkshopDetails(student._id, token);
    fetchCourseDetails(student._id, token);
    fetchJobLetterDetails(student._id, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <div>
      <Menu />

      <div className="d-flex container my-5 justify-content-center">
        <div className=" p-2 text-white my-auto">
          <h4 className="text-uppercase">Welcome</h4>
        </div>
        <div className="p-2 ">
          <h4 className="text-uppercase  text-white">
            {studentData["Register Number"]}
          </h4>
        </div>
      </div>

      {/* INTERNSHIP SECTION */}
      <div className="d-flex container my-4 ">
        <div className="mr-auto p-2 text-white my-auto">
          <h4 className="text-uppercase">Internship</h4>
        </div>
        <div className="p-2 ">
          <Link
            className="btn btn-warning font-weight-bold"
            to="/student/internship"
          >
            UPLOAD
          </Link>
        </div>
      </div>
      {/* SHOWING THE CONTENT */}
      {internshipInfo.length > 0 && (
        <OwlCarousel
          className="owl-theme container owl-rtl "
          margin={10}
          nav
          responsiveClass={true}
          responsive={{
            0: {
              items: 1,
              nav: true,
            },

            480: {
              items: 3,
              nav: true,
            },

            768: {
              items: 3,
              nav: true,
            },
          }}
        >
          {/* SHOWING THE INTERNSHIP CONTENT */}
          {internshipInfo.map((internship) => (
            <div className="item" key={internship._id}>
              <div className="card bg-light ">
                <ImageInternHelper internship={internship} />

                <div className="card-body">
                  <h6 className="card-title font-weight-bold">
                    Job :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {internship["Job Name"]}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold ">
                    Organization :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {internship["Organization Name"]}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold">
                    Duration :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {internship.Duration}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold">
                    Location :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {internship.Location}
                    </span>
                  </h6>

                  <button
                    className="mt-4 btn btn-dark btn-block text-white font-weight-bold text-uppercase"
                    onClick={() => removeInternshipFromFront(internship._id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}

      {/* WORKSHOP SECTION */}
      <div className="d-flex container my-4 ">
        <div className="mr-auto p-2 text-white my-auto">
          <h4 className="text-uppercase">workshop</h4>
        </div>
        <div className="p-2 ">
          <Link
            className="btn btn-warning font-weight-bold"
            to="/student/workshops"
          >
            UPLOAD
          </Link>
        </div>
      </div>
      {/* SHOWING THE CONTENT */}
      {workshopInfo.length > 0 && (
        <OwlCarousel
          className="owl-theme container owl-rtl responsiveClass"
          margin={10}
          nav
          responsiveClass={true}
          responsive={{
            0: {
              items: 1,
              nav: true,
            },

            480: {
              items: 3,
              nav: true,
            },

            768: {
              items: 3,
              nav: true,
            },
          }}
        >
          {workshopInfo.map((workshop) => (
            <div className="item" key={workshop._id}>
              <div className="card ">
                <ImageWorkshopHelper workshop={workshop} />

                <div className="card-body">
                  <h6 className="card-title font-weight-bold">
                    Course :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {workshop["Course Name"]}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold ">
                    Organization :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {workshop["Organization Name"]}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold">
                    Duration :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {workshop.Duration}
                    </span>
                  </h6>

                  <button
                    className="mt-4 btn btn-dark btn-block text-white font-weight-bold text-uppercase"
                    onClick={() => removeWorkshopFromFront(workshop._id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}

      {/* COURSE SECTION */}
      <div className="d-flex container my-4 ">
        <div className="mr-auto p-2 text-white my-auto">
          <h4 className="text-uppercase">Course</h4>
        </div>
        <div className="p-2 ">
          <Link
            className="btn btn-warning font-weight-bold"
            to="/student/onlinecourses"
          >
            UPLOAD
          </Link>
        </div>
      </div>
      {/* SHOWING THE CONTENT */}
      {courseInfo.length > 0 && (
        <OwlCarousel
          className="owl-theme container owl-rtl responsiveClass"
          margin={10}
          nav
          responsiveClass={true}
          responsive={{
            0: {
              items: 1,
              nav: true,
            },

            480: {
              items: 3,
              nav: true,
            },

            768: {
              items: 3,
              nav: true,
            },
          }}
        >
          {courseInfo.map((course) => (
            <div className="item" key={course._id}>
              <div className="card ">
                <ImageCourseHelper course={course} />
                <div className="card-body">
                  <h6 className="card-title font-weight-bold">
                    Course :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {course["Course Name"]}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold ">
                    Platform :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {course["Platform Name"]}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold">
                    Duration :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {course.Duration}
                    </span>
                  </h6>

                  <button
                    className="mt-4 btn btn-dark btn-block text-white font-weight-bold text-uppercase"
                    onClick={() => removeCourseFromFront(course._id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}

      <div className="d-flex container my-4  ">
        <div className="mr-auto p-2 text-white my-auto">
          <h4 className="text-uppercase">joboffers</h4>
        </div>
        <div className="p-2 ">
          <Link
            className="btn btn-warning font-weight-bold"
            to="/student/joboffers"
          >
            UPLOAD
          </Link>
        </div>
      </div>
      {jobInfo.length > 0 && (
        <OwlCarousel
          className="owl-theme container owl-rtl responsiveClass mb-5"
          margin={10}
          nav
          responsiveClass={true}
          responsive={{
            0: {
              items: 1,
              nav: true,
            },

            480: {
              items: 3,
              nav: true,
            },

            768: {
              items: 3,
              nav: true,
            },
          }}
        >
          {jobInfo.map((job) => (
            <div className="item" key={job._id}>
              <div className="card bg-light ">
                <div>
                  <Pdfillustration className="card-img" />
                </div>
                <div className="card-body">
                  <h6 className="card-title font-weight-bold">
                    Job :
                    <span className="text-uppercase font-weight-normal">
                      {job["Job Title"]}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold ">
                    Organization :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {job["Organization Name"]}
                    </span>
                  </h6>
                  <h6 className="card-title font-weight-bold ">
                    Salary :{" "}
                    <span className="text-uppercase font-weight-normal">
                      {job.Salary}
                    </span>
                  </h6>

                  <a
                    className="mt-4 btn btn-primary btn-block text-white font-weight-bold text-uppercase"
                    href={`${API}/job/certificate/${job._id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    view
                  </a>
                  <button
                    className="mt-4 btn btn-dark btn-block text-white font-weight-bold text-uppercase"
                    onClick={() => removeJobFromFront(job._id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default StudentHome;
