import React, { useState } from "react";
import Menu from "../template/Menu";
import { isAuthenticated } from "../auth/helper";
import {
  getBatchStudent,
  getInternship,
  getWorkshop,
  getCourse,
  getJobOffer,
} from "./helper/Adminapicalls";
import exportFromJSON from "export-from-json";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const Batch = () => {
  const { student, token } = isAuthenticated();

  const [placementDisabled, setPlacementDisabled] = useState(true);
  const [internDisabled, setInternDisabled] = useState(true);
  const [workshopDisabled, setWorkshopDisabled] = useState(true);
  const [courseDisabled, setCourseDisabled] = useState(true);
  const [jobofferDisabled, setJobofferDisabled] = useState(true);

  const [batchDetails, setBatchDetails] = useState([]);
  const [intershipDetails, setInternshipDetails] = useState([]);
  const [jobOfferDetails, setJobOfferDetails] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [workshopDetails, setWorkshopDetails] = useState([]);

  const exportType = "csv";
  var zip = new JSZip();

  const BatchDetails = (year) => {
    setBatchDetails([]);

    getBatchStudent(student._id, token, year)
      .then((data) => {
        if (Object.keys(data).length === 0) setPlacementDisabled(true);
        else {
          setBatchDetails([...data]);
          setPlacementDisabled(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const InternDetails = (year) => {
    setInternshipDetails([]);

    getInternship(student._id, token, year)
      .then((data) => {
        console.log();
        if (Object.keys(data).length === 0) {
          setInternDisabled(true);
        } else {
          setInternshipDetails(data);
          setInternDisabled(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const JobOfferDetails = (year) => {
    setJobOfferDetails([]);

    getJobOffer(student._id, token, year)
      .then((data) => {
        if (Object.keys(data).length === 0) {
          setJobofferDisabled(true);
        } else {
          setJobOfferDetails(data);
          setJobofferDisabled(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const CourseDetatails = (year) => {
    setCourseDetails([]);

    getCourse(student._id, token, year)
      .then((data) => {
        if (Object.keys(data).length === 0) {
          setCourseDisabled(true);
        } else {
          setCourseDetails(data);
          setCourseDisabled(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const WorkshopDetails = (year) => {
    setWorkshopDetails([]);

    getWorkshop(student._id, token, year)
      .then((data) => {
        if (Object.keys(data).length === 0) {
          setWorkshopDisabled(true);
        } else {
          setWorkshopDetails(data);
          setWorkshopDisabled(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const downloadPlacement = () => {
    let data = batchDetails;
    let fileName = "PLACEMENT DETAILS";
    exportFromJSON({ data, fileName, exportType });
  };

  const downloadJobOffer = () => {
    jobOfferDetails.map((data, index) =>
      zip.file(
        `${data["Register Number"]}(${index}).pdf`,
        data.Certificate?.data.data,
        {
          base64: true,
        }
      )
    );

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "JobOffer.zip");
    });

    let data = jobOfferDetails;
    let fileName = "JOBOFFER";
    data.map((datas) => delete datas.Certificate);
    exportFromJSON({ data, fileName, exportType });
  };

  const downloadInternship = () => {
    intershipDetails.map((data, index) =>
      zip.file(
        `${data["Register Number"]}(${index}).png`,
        data.Certificate?.data.data,
        {
          base64: true,
        }
      )
    );

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "Internship.zip");
    });

    let data = intershipDetails;
    let fileName = "Internship";
    data.map((datas) => delete datas.Certificate);
    exportFromJSON({ data, fileName, exportType });
  };

  const downloadWorkshop = () => {
    workshopDetails.map((data, index) =>
      zip.file(
        `${data["Register Number"]}(${index}).png`,
        data.Certificate?.data.data,
        {
          base64: true,
        }
      )
    );

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "Workshop.zip");
    });

    let data = workshopDetails;
    let fileName = "WORKSHOP";
    data.map((datas) => delete datas.Certificate);
    exportFromJSON({ data, fileName, exportType });
  };

  const downloadCourse = () => {
    courseDetails.map((data, index) =>
      zip.file(
        `${data["Register Number"]}(${index}).png`,
        data.Certificate?.data.data,
        {
          base64: true,
        }
      )
    );

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "Course.zip");
    });

    let data = courseDetails;
    let fileName = "COURSE";
    data.map((datas) => delete datas.Certificate);
    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <div>
      <Menu />

      <div className="container my-5">
        <div id="accordion">
          <div className="card bg-light text-dark mb-3">
            <div className="d-flex justify-content-between  ">
              <div
                className="p-3 my-auto font-weight-bold d-block card-header btn-block "
                id="Batch2018"
                data-toggle="collapse"
                data-target="#Batch2018"
                aria-expanded="true"
                aria-controls="Batch2018"
                onClick={() => {
                  BatchDetails("2018");
                  InternDetails("2018");
                  WorkshopDetails("2018");
                  CourseDetatails("2018");
                  JobOfferDetails("2018");
                }}
                style={{ cursor: "pointer" }}
              >
                BATCH 2018-2022
              </div>
            </div>

            <div
              id="Batch2018"
              className="collapse"
              aria-labelledby="Batch2018"
              data-parent="#accordion"
            >
              <div className="card-body d-md-flex justify-content-md-around ">
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2018"
                  aria-labelledby="Batch2018"
                  data-parent="#accordion"
                  onClick={() => downloadPlacement()}
                  disabled={placementDisabled}
                >
                  Placement
                </button>

                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2018"
                  aria-labelledby="Batch2018"
                  data-parent="#accordion"
                  onClick={() => downloadJobOffer()}
                  disabled={jobofferDisabled}
                >
                  JobOffer
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2018"
                  aria-labelledby="Batch2018"
                  data-parent="#accordion"
                  onClick={() => downloadInternship()}
                  disabled={internDisabled}
                >
                  Internship
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2018"
                  aria-labelledby="Batch2018"
                  data-parent="#accordion"
                  onClick={() => downloadWorkshop()}
                  disabled={workshopDisabled}
                >
                  Workshop
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2018"
                  aria-labelledby="Batch2018"
                  data-parent="#accordion"
                  onClick={() => downloadCourse()}
                  disabled={courseDisabled}
                >
                  Course
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-light text-dark mb-3">
            <div className="d-flex  justify-content-between ">
              <div
                className=" p-3 my-auto font-weight-bold  card-header d-block btn-block "
                id="Batch2019"
                data-toggle="collapse"
                data-target="#Batch2019"
                aria-expanded="true"
                aria-controls="Batch2019"
                onClick={() => {
                  BatchDetails("2019");
                  InternDetails("2019");
                  WorkshopDetails("2019");
                  CourseDetatails("2019");
                  JobOfferDetails("2019");
                }}
                style={{ cursor: "pointer" }}
              >
                BATCH 2019-2023
              </div>
            </div>

            <div
              id="Batch2019"
              className="collapse"
              aria-labelledby="Batch2019"
              data-parent="#accordion"
            >
              <div
                className="card-body d-md-flex justify-content-md-around 
              "
              >
                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2019"
                  aria-labelledby="Batch2019"
                  data-parent="#accordion"
                  onClick={() => downloadPlacement()}
                  disabled={placementDisabled}
                >
                  Placement
                </button>

                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2019"
                  aria-labelledby="Batch2019"
                  data-parent="#accordion"
                  onClick={() => downloadJobOffer()}
                  disabled={jobofferDisabled}
                >
                  JobOffer
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2019"
                  aria-labelledby="Batch2019"
                  data-parent="#accordion"
                  onClick={() => downloadInternship()}
                  disabled={internDisabled}
                >
                  Internship
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2019"
                  aria-labelledby="Batch2019"
                  data-parent="#accordion"
                  onClick={() => downloadWorkshop()}
                  disabled={workshopDisabled}
                >
                  Workshop
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2019"
                  aria-labelledby="Batch2019"
                  data-parent="#accordion"
                  onClick={() => downloadCourse()}
                  disabled={courseDisabled}
                >
                  Course
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-light text-dark mb-3">
            <div className="d-flex  justify-content-between ">
              <div
                className=" p-3 my-auto font-weight-bold  card-header d-block btn-block "
                id="Batch2020"
                data-toggle="collapse"
                data-target="#Batch2020"
                aria-expanded="true"
                aria-controls="Batch2020"
                onClick={() => {
                  BatchDetails("2020");
                  InternDetails("2020");
                  WorkshopDetails("2020");
                  CourseDetatails("2020");
                  JobOfferDetails("2020");
                }}
                style={{ cursor: "pointer" }}
              >
                BATCH 2020-2024
              </div>
            </div>

            <div
              id="Batch2020"
              className="collapse"
              aria-labelledby="Batch2020"
              data-parent="#accordion"
            >
              <div className="card-body d-md-flex justify-content-md-around ">
                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2020"
                  aria-labelledby="Batch2020"
                  data-parent="#accordion"
                  onClick={() => downloadPlacement()}
                  disabled={placementDisabled}
                >
                  Placement
                </button>

                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2020"
                  aria-labelledby="Batch2020"
                  data-parent="#accordion"
                  onClick={() => downloadJobOffer()}
                  disabled={jobofferDisabled}
                >
                  JobOffer
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2020"
                  aria-labelledby="Batch2020"
                  data-parent="#accordion"
                  onClick={() => downloadInternship()}
                  disabled={internDisabled}
                >
                  Internship
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2020"
                  aria-labelledby="Batch2020"
                  data-parent="#accordion"
                  onClick={() => downloadWorkshop()}
                  disabled={workshopDisabled}
                >
                  Workshop
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2020"
                  aria-labelledby="Batch2020"
                  data-parent="#accordion"
                  onClick={() => downloadCourse()}
                  disabled={courseDisabled}
                >
                  Course
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-light text-dark mb-3">
            <div className="d-flex  justify-content-between ">
              <div
                className=" p-3 my-auto font-weight-bold  card-header d-block btn-block "
                id="Batch2021"
                data-toggle="collapse"
                data-target="#Batch2021"
                aria-expanded="true"
                aria-controls="Batch2021"
                onClick={() => {
                  BatchDetails("2021");
                  InternDetails("2021");
                  WorkshopDetails("2021");
                  CourseDetatails("2021");
                  JobOfferDetails("2021");
                }}
                style={{ cursor: "pointer" }}
              >
                BATCH 2021-2025
              </div>
            </div>

            <div
              id="Batch2021"
              className="collapse"
              aria-labelledby="Batch2021"
              data-parent="#accordion"
            >
              <div className="card-body d-md-flex justify-content-md-around ">
                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2021"
                  aria-labelledby="Batch2021"
                  data-parent="#accordion"
                  onClick={() => downloadPlacement()}
                  disabled={placementDisabled}
                >
                  Placement
                </button>

                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2021"
                  aria-labelledby="Batch2021"
                  data-parent="#accordion"
                  onClick={() => downloadJobOffer()}
                  disabled={jobofferDisabled}
                >
                  JobOffer
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2021"
                  aria-labelledby="Batch2021"
                  data-parent="#accordion"
                  onClick={() => downloadInternship()}
                  disabled={internDisabled}
                >
                  Internship
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2021"
                  aria-labelledby="Batch2021"
                  data-parent="#accordion"
                  onClick={() => downloadWorkshop()}
                  disabled={workshopDisabled}
                >
                  Workshop
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2021"
                  aria-labelledby="Batch2021"
                  data-parent="#accordion"
                  onClick={() => downloadCourse()}
                  disabled={courseDisabled}
                >
                  Course
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-light text-dark mb-3">
            <div className="d-flex  justify-content-between ">
              <div
                className=" p-3 my-auto font-weight-bold  card-header d-block btn-block "
                id="Batch2022"
                data-toggle="collapse"
                data-target="#Batch2022"
                aria-expanded="true"
                aria-controls="Batch2022"
                onClick={() => {
                  BatchDetails("2022");
                  InternDetails("2022");
                  WorkshopDetails("2022");
                  CourseDetatails("2022");
                  JobOfferDetails("2022");
                }}
                style={{ cursor: "pointer" }}
              >
                BATCH 2022-2026
              </div>
            </div>

            <div
              id="Batch2022"
              className="collapse"
              aria-labelledby="Batch2022"
              data-parent="#accordion"
            >
              <div className="card-body d-md-flex justify-content-md-around ">
                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2022"
                  aria-labelledby="Batch2022"
                  data-parent="#accordion"
                  onClick={() => downloadPlacement()}
                  disabled={placementDisabled}
                >
                  Placement
                </button>

                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2022"
                  aria-labelledby="Batch2022"
                  data-parent="#accordion"
                  onClick={() => downloadJobOffer()}
                  disabled={jobofferDisabled}
                >
                  JobOffer
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2022"
                  aria-labelledby="Batch2022"
                  data-parent="#accordion"
                  onClick={() => downloadInternship()}
                  disabled={internDisabled}
                >
                  Internship
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2022"
                  aria-labelledby="Batch2022"
                  data-parent="#accordion"
                  onClick={() => downloadWorkshop()}
                  disabled={workshopDisabled}
                >
                  Workshop
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2022"
                  aria-labelledby="Batch2022"
                  data-parent="#accordion"
                  onClick={() => downloadCourse()}
                  disabled={courseDisabled}
                >
                  Course
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-light text-dark mb-3">
            <div className="d-flex  justify-content-between ">
              <div
                className=" p-3 my-auto font-weight-bold  card-header d-block btn-block "
                id="Batch2023"
                data-toggle="collapse"
                data-target="#Batch2023"
                aria-expanded="true"
                aria-controls="Batch2023"
                onClick={() => {
                  BatchDetails("2023");
                  InternDetails("2023");
                  WorkshopDetails("2023");
                  CourseDetatails("2023");
                  JobOfferDetails("2023");
                }}
                style={{ cursor: "pointer" }}
              >
                BATCH 2023-2027
              </div>
            </div>

            <div
              id="Batch2023"
              className="collapse"
              aria-labelledby="Batch2023"
              data-parent="#accordion"
            >
              <div className="card-body d-md-flex justify-content-md-around ">
                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2023"
                  aria-labelledby="Batch2023"
                  data-parent="#accordion"
                  onClick={() => downloadPlacement()}
                  disabled={placementDisabled}
                >
                  Placement
                </button>

                <button
                  className="btn btn-outline-dark font-weight-bold   collapse m-2"
                  id="Batch2023"
                  aria-labelledby="Batch2023"
                  data-parent="#accordion"
                  onClick={() => downloadJobOffer()}
                  disabled={jobofferDisabled}
                >
                  JobOffer
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2023"
                  aria-labelledby="Batch2023"
                  data-parent="#accordion"
                  onClick={() => downloadInternship()}
                  disabled={internDisabled}
                >
                  Internship
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2023"
                  aria-labelledby="Batch2023"
                  data-parent="#accordion"
                  onClick={() => downloadWorkshop()}
                  disabled={workshopDisabled}
                >
                  Workshop
                </button>
                <button
                  className="btn btn-outline-dark font-weight-bold  collapse m-2"
                  id="Batch2023"
                  aria-labelledby="Batch2023"
                  data-parent="#accordion"
                  onClick={() => downloadCourse()}
                  disabled={courseDisabled}
                >
                  Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Batch;
