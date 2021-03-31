import React, { useEffect, useState } from "react";

// for helper functions
import { isAuthenticated } from "../auth/helper";
import {
  getStudentDetails,
  updateStudentProfile,
} from "./helper/StudentapiCalls";

//for error and success message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "../template/Menu";

//need for styling
import "../style.css";

//for dropdown in title field
import Select from "react-select";
import Footer from "../template/Footer";

import { getToggleDetails } from "../AdminView/helper/Adminapicalls";

const Profile = () => {
  //creating an object of students data

  const [studentData, setStudentData] = useState({
    "Register Number": "",
    "Roll Number": "",
    Title: "",
    "Full Name": "",
    "First Name": "",
    "Last Name": "",
    Gender: "",
    "DOB I": "",
    "DOB II": "",
    "DOB III": "",
    College: "",
    Degree: "",
    Branch: "",
    Section: "",
    "Year Of Admission": "",

    "Tenth Percentage": "",
    "Tenth Board Of Study": "",
    "Tenth Medium Of Study": "",
    "Tenth Year Of Passing": "",
    "Tenth School Name": "",
    "Tenth Graduating State": "",

    "Twelfth Percentage": "",
    "Twelfth Board Of Study": "",
    "Twelfth Medium Of Study": "",
    "Twelfth Year Of Passing": "",
    "Twelfth School Name": "",
    "Twelfth Graduating State": "",

    "Diploma Specilazation OR Branch": "",
    "Diploma Percentage": "",
    "Diploma Year Of Passing": "",
    "Name Of Institute": "",
    "Diploma Graduating State": "",

    "Sem 1 GPA": "",
    "Sem 2 GPA": "",
    "Sem 3 GPA": "",
    "Sem 4 GPA": "",
    "Sem 5 GPA": "",
    "Sem 6 GPA": "",
    "Sem 7 GPA": "",
    "Sem 8 GPA": "",
    "Overall CGPA": "",

    "Number Of Arrears Sem 1": "",
    "Number Of Arrears Sem 2": "",
    "Number Of Arrears Sem 3": "",
    "Number Of Arrears Sem 4": "",
    "Number Of Arrears Sem 5": "",
    "Number Of Arrears Sem 6": "",
    "Number Of Arrears Sem 7": "",
    "Number Of Arrears Sem 8": "",
    "Total Number Of Standing Arrears": "",
    "Is History Of Arrears": "",
    "Number Of History Of Arrears": "",

    "Land Line Number": "",
    "Primary Number": "",
    "Emergency Number": "",
    "Primary Email ID": "",
    "Alternate Email ID": "",

    "Sports Quota": "",
    "BEC Status": "",
    "BEC Grade": "",

    "Languages Known": "",
    "Gap In Education": "",
    "Is Higher Studies": "",

    "PAN Number": "",
    Nationality: "",
    "Indian Passport Number": "",
    "Aadhaar Number": "",

    "Father Name": "",
    "Father Designation": "",
    "Father Organization": "",
    "Father Mobile Number": "",
    "Father Mail ID": "",

    "Mother Name": "",
    "Mother Designation": "",
    "Mother Organization": "",
    "Mother Mobile Number": "",
    "Mother Mail ID": "",

    "Permanent Address": "",
    "Permanent Address Line 1": "",
    "Permanent Address Line 2": "",
    "Permanent City": "",
    State: "",
    "Skill Set": "",
    "Postal Code": "",
    "Hostel OR Day Scholar": "",
    "Is POP2 Training": "",
    "Future Skills": "",
  });

  //to disable edit profile button
  const [disabled, setDisabled] = useState(false);

  //for changing between editform and user profile
  const [editing, setEditing] = useState(false);

  //destructing the values
  const {
    Title,
    Gender,
    College,
    Degree,
    Branch,
    Section,
    Nationality,
    State,
  } = studentData;

  //getting the token and student details for passing it in helper function
  const { student, token } = isAuthenticated();

  //details are being fetched from DB
  const fetchStudentDetails = (studentID, token) => {
    getStudentDetails(studentID, token)
      .then((data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          setStudentData({
            ...studentData,
            "Register Number": data["Register Number"],
            "Roll Number": data["Roll Number"],
            Title: data.Title,
            "Full Name": data["Full Name"],
            "First Name": data["First Name"],
            "Last Name": data["Last Name"],
            Gender: data.Gender,
            "DOB I": data["DOB I"],
            "DOB II": data["DOB II"],
            "DOB III": data["DOB III"],
            College: data.College,
            Degree: data.Degree,
            Branch: data.Branch,
            Section: data.Section,
            "Year Of Admission": data["Year Of Admission"],

            "Tenth Percentage": data["Tenth Percentage"],
            "Tenth Board Of Study": data["Tenth Board Of Study"],
            "Tenth Medium Of Study": data["Tenth Medium Of Study"],
            "Tenth Year Of Passing": data["Tenth Year Of Passing"],
            "Tenth School Name": data["Tenth School Name"],
            "Tenth Graduating State": data["Tenth Graduating State"],

            "Twelfth Percentage": data["Twelfth Percentage"],
            "Twelfth Board Of Study": data["Twelfth Board Of Study"],
            "Twelfth Medium Of Study": data["Twelfth Medium Of Study"],
            "Twelfth Year Of Passing": data["Twelfth Year Of Passing"],
            "Twelfth School Name": data["Twelfth School Name"],
            "Twelfth Graduating State": data["Twelfth Graduating State"],

            "Diploma Specilazation OR Branch":
              data["Diploma Specilazation OR Branch"],
            "Diploma Percentage": data["Diploma Percentage"],
            "Diploma Year Of Passing": data["Diploma Year Of Passing"],
            "Name Of Institute": data["Name Of Institute"],
            "Diploma Graduating State": data["Diploma Graduating State"],

            "Sem 1 GPA": data["Sem 1 GPA"],
            "Sem 2 GPA": data["Sem 2 GPA"],
            "Sem 3 GPA": data["Sem 3 GPA"],
            "Sem 4 GPA": data["Sem 4 GPA"],
            "Sem 5 GPA": data["Sem 5 GPA"],
            "Sem 6 GPA": data["Sem 6 GPA"],
            "Sem 7 GPA": data["Sem 7 GPA"],
            "Sem 8 GPA": data["Sem 8 GPA"],
            "Overall CGPA": data["Overall CGPA"],

            "Number Of Arrears Sem 1": data["Number Of Arrears Sem 1"],
            "Number Of Arrears Sem 2": data["Number Of Arrears Sem 2"],
            "Number Of Arrears Sem 3": data["Number Of Arrears Sem 3"],
            "Number Of Arrears Sem 4": data["Number Of Arrears Sem 4"],
            "Number Of Arrears Sem 5": data["Number Of Arrears Sem 5"],
            "Number Of Arrears Sem 6": data["Number Of Arrears Sem 6"],
            "Number Of Arrears Sem 7": data["Number Of Arrears Sem 7"],
            "Number Of Arrears Sem 8": data["Number Of Arrears Sem 8"],
            "Total Number Of Standing Arrears":
              data["Total Number Of Standing Arrears"],
            "Is History Of Arrears": data["Is History Of Arrears"],
            "Number Of History Of Arrears":
              data["Number Of History Of Arrears"],

            "Land Line Number": data["Land Line Number"],
            "Primary Number": data["Primary Number"],
            "Emergency Number": data["Emergency Number"],
            "Primary Email ID": data["Primary Email ID"],
            "Alternate Email ID": data["Alternate Email ID"],

            "Sports Quota": data["Sports Quota"],
            "BEC Status": data["BEC Status"],
            "BEC Grade": data["BEC Grade"],

            "Languages Known": data["Languages Known"],
            "Gap In Education": data["Gap In Education"],
            "Is Higher Studies": data["Is Higher Studies"],

            "PAN Number": data["PAN Number"],
            Nationality: data.Nationality,
            "Indian Passport Number": data["Indian Passport Number"],
            "Aadhaar Number": data["Aadhaar Number"],

            "Father Name": data["Father Name"],
            "Father Designation": data["Father Designation"],
            "Father Organization": data["Father Organization"],
            "Father Mobile Number": data["Father Mobile Number"],
            "Father Mail ID": data["Father Mail ID"],

            "Mother Name": data["Mother Name"],
            "Mother Designation": data["Mother Designation"],
            "Mother Organization": data["Mother Organization"],
            "Mother Mobile Number": data["Mother Mobile Number"],
            "Mother Mail ID": data["Mother Mail ID"],

            "Permanent Address": data["Permanent Address"],
            "Permanent Address Line 1": data["Permanent Address Line 1"],
            "Permanent Address Line 2": data["Permanent Address Line 2"],
            "Permanent City": data["Permanent City"],
            State: data.State,
            "Skill Set": data["Skill Set"],
            "Postal Code": data["Postal Code"],
            "Hostel OR Day Scholar": data["Hostel OR Day Scholar"],
            "Is POP2 Training": data["Is POP2 Training"],
            "Future Skills": data["Future Skills"],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //Edit Function
  const OnEditSubmission = (event) => {
    event.preventDefault();

    updateStudentProfile(student._id, token, studentData)
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success(data.message);
          setTimeout(function () {
            setEditing(false);
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  //handling the input change
  const handleChange = (name) => (event) => {
    const value =
      name === "Title" ||
      name === "Gender" ||
      name === "Section" ||
      name === "Is History Of Arrears" ||
      name === "Hostel OR Day Scholar" ||
      name === "Is POP2 Training" ||
      name === "Future Skills" ||
      name === "Sports Quota" ||
      name === "Is Higher Studies"
        ? event.value
        : event.target.value;

    if (
      name === "Primary Email ID" ||
      name === "Alternate Email ID" ||
      name === "Father Mail ID" ||
      name === "Mother Mail ID"
    ) {
      setStudentData({ ...studentData, [name]: value });
    } else {
      setStudentData({ ...studentData, [name]: value.toUpperCase() });
    }
  };

  //hooks
  useEffect(() => {
    const { student, token } = isAuthenticated();
    fetchStudentDetails(student._id, token);

    //calling admin functions
    getToggleDetails().then((data) => {
      const { profile } = data;
      setDisabled(!profile);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  // EditForm page
  const EditProfile = () => {
    return (
      <div>
        <h3 className="text-white text-center mt-5">EDIT YOUR PROFILE</h3>
        <form className=" container shadow my-5 p-4">
          <div className="form-group">
            <label className="text-white">Register Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 312418205087"
              value={studentData["Register Number"]}
              onChange={handleChange("Register Number")}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-white">Roll Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg:18IT1209"
              value={studentData["Roll Number"]}
              onChange={handleChange("Roll Number")}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white">Title *</label>
            <Select
              options={[
                { value: "Mr.", label: "Mr." },
                { value: "Mrs.", label: "Mrs." },
              ]}
              onChange={handleChange("Title")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Full Name *</label>
            <input
              type="text"
              className="form-control"
              value={studentData["Full Name"]}
              placeholder="Eg: WILSON ROY (incase of WILSON R)"
              onChange={handleChange("Full Name")}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white">First Name *</label>
            <input
              type="text"
              className="form-control"
              value={studentData["First Name"]}
              placeholder="Eg: WILSON"
              onChange={handleChange("First Name")}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white ">Last Name (if any)</label>
            <input
              type="text "
              className="form-control"
              placeholder="Eg: JOHN"
              value={studentData["Last Name"]}
              onChange={handleChange("Last Name")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Gender *</label>
            <Select
              options={[
                { value: "MALE", label: "MALE" },
                { value: "FEMALE", label: "FEMALE" },
                { value: "OTHERS", label: "OTHERS" },
              ]}
              onChange={handleChange("Gender")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">DOB (DD/MM/YYYY) *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 10/12/2000"
              value={studentData["DOB I"]}
              onChange={handleChange("DOB I")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">DOBII (MM/DD/YYYY) *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 12/10/2000"
              value={studentData["DOB II"]}
              onChange={handleChange("DOB II")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">DOBIII (YYYY-MM-DD) *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2000-12-10"
              value={studentData["DOB III"]}
              onChange={handleChange("DOB III")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">College *</label>
            <input
              type="text text-uppercase"
              className="form-control"
              value={College}
              onChange={handleChange("College")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Degree *</label>
            <input
              type="text "
              className="form-control"
              value={Degree}
              onChange={handleChange("Degree")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Branch *</label>
            <input
              type="text text-uppercase"
              className="form-control"
              value={Branch}
              onChange={handleChange("Branch")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Section *</label>
            <Select
              options={[
                { value: "A", label: "A" },
                { value: "B", label: "B" },
              ]}
              onChange={handleChange("Section")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Year Of Admission *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2018"
              value={studentData["Year Of Admission"]}
              onChange={handleChange("Year Of Admission")}
            />
          </div>

          {/** TENTH RELATED */}
          <div className="form-group">
            <label className="text-white">Tenth Percentage *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 97.6"
              value={studentData["Tenth Percentage"]}
              onChange={handleChange("Tenth Percentage")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Tenth Board Of Study *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: STATE BOARD"
              value={studentData["Tenth Board Of Study"]}
              onChange={handleChange("Tenth Board Of Study")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Tenth Medium Of Study *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ENGLISH"
              value={studentData["Tenth Medium Of Study"]}
              onChange={handleChange("Tenth Medium Of Study")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Tenth Year Of Passing *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2016"
              value={studentData["Tenth Year Of Passing"]}
              onChange={handleChange("Tenth Year Of Passing")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Tenth School Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ST THOMAS MATRICULATION HIGHER SECONDARY SCHOOL"
              value={studentData["Tenth School Name"]}
              onChange={handleChange("Tenth School Name")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Tenth Graduating State *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL NADU"
              value={studentData["Tenth Graduating State"]}
              onChange={handleChange("Tenth Graduating State")}
            />
          </div>

          {/** twelfth RELATED */}
          <div className="form-group">
            <label className="text-white">Twelfth Percentage *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 97.66"
              value={studentData["Twelfth Percentage"]}
              onChange={handleChange("Twelfth Percentage")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth Board Of Study *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: STATE BOARD"
              value={studentData["Twelfth Board Of Study"]}
              onChange={handleChange("Twelfth Board Of Study")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth Medium Of Study *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ENGLISH"
              value={studentData["Twelfth Medium Of Study"]}
              onChange={handleChange("Twelfth Medium Of Study")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth Year Of Passing *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2018"
              value={studentData["Twelfth Year Of Passing"]}
              onChange={handleChange("Twelfth Year Of Passing")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth School Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ST THOMAS MATRICULATION HIGHER SECONDARY SCHOOL"
              value={studentData["Twelfth School Name"]}
              onChange={handleChange("Twelfth School Name")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth Graduating State *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL NADU"
              value={studentData["Twelfth Graduating State"]}
              onChange={handleChange("Twelfth Graduating State")}
            />
          </div>

          {/**diploma */}
          <div className="form-group">
            <label className="text-white">
              Diploma Specilazation OR Branch *
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: MECHANINCAL"
              value={studentData["Diploma Specilazation OR Branch"]}
              onChange={handleChange("Diploma Specilazation OR Branch")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Diploma Percentage *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 10"
              value={studentData["Diploma Percentage"]}
              onChange={handleChange("Diploma Percentage")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Diploma Year Of Passing *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2019"
              value={studentData["Diploma Year Of Passing"]}
              onChange={handleChange("Diploma Year Of Passing")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Name Of Institute *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: JOHNS POLYTECHNIC"
              value={studentData["Name Of Institute"]}
              onChange={handleChange("Name Of Institute")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Diploma Graduating State *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL NADU"
              value={studentData["Diploma Graduating State"]}
              onChange={handleChange("Diploma Graduating State")}
            />
          </div>

          {/**sem related */}

          <div className="form-group">
            <label className="text-white">Sem 1 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Sem 1 GPA"]}
              onChange={handleChange("Sem 1 GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 2 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Sem 2 GPA"]}
              onChange={handleChange("Sem 2 GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 3 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Sem 3 GPA"]}
              onChange={handleChange("Sem 3 GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 4 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Sem 4 GPA"]}
              onChange={handleChange("Sem 4 GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 5 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Sem 5 GPA"]}
              onChange={handleChange("Sem 5 GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 6 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Sem 6 GPA"]}
              onChange={handleChange("Sem 6 GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 7 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Sem 7 GPA"]}
              onChange={handleChange("Sem 7 GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 8 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Sem 8 GPA"]}
              onChange={handleChange("Sem 8 GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Overall CGPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={studentData["Overall CGPA"]}
              onChange={handleChange("Overall CGPA")}
            />
          </div>

          {/*arrear related*/}
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 1 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of Arrears Sem 1"]}
              onChange={handleChange("Number Of Arrears Sem 1")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 2 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of Arrears Sem 2"]}
              onChange={handleChange("Number Of Arrears Sem 2")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 3 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of Arrears Sem 3"]}
              onChange={handleChange("Number Of Arrears Sem 3")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 4 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of Arrears Sem 4"]}
              onChange={handleChange("Number Of Arrears Sem 4")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 5 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of Arrears Sem 5"]}
              onChange={handleChange("Number Of Arrears Sem 5")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 6 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of Arrears Sem 6"]}
              onChange={handleChange("Number Of Arrears Sem 6")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 7 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of Arrears Sem 7"]}
              onChange={handleChange("Number Of Arrears Sem 7")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 8 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of Arrears Sem 8"]}
              onChange={handleChange("Number Of Arrears Sem 8")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">
              Total Number Of Standing Arrears *
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Total Number Of Standing Arrears"]}
              onChange={handleChange("Total Number Of Standing Arrears")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Is History Of Arrears *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("Is History Of Arrears")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Number Of History Of Arrears *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={studentData["Number Of History Of Arrears"]}
              onChange={handleChange("Number Of History Of Arrears")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Land Line Number *</label>
            <input
              type="text"
              className="form-control"
              value={studentData["Land Line Number"]}
              placeholder="Eg: 7513200000"
              onChange={handleChange("Land Line Number")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Primary Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7871835412"
              value={studentData["Primary Number"]}
              onChange={handleChange("Primary Number")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Emergency Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 9442235412"
              value={studentData["Emergency Number"]}
              onChange={handleChange("Emergency Number")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Primary Email ID *</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Eg: robert123@gmail.com"
              value={studentData["Primary Email ID"]}
              onChange={handleChange("Primary Email ID")}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-white">Alternate Email ID *</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Eg: robertjohn123@gmail.com"
              value={studentData["Alternate Email ID"]}
              onChange={handleChange("Alternate Email ID")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Sports Quota *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("Sports Quota")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">BEC status *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: VANTAGE"
              value={studentData["BEC Status"]}
              onChange={handleChange("BEC Status")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">BEC grade *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: COUNCIL OF EUROPE LEVEL B2"
              value={studentData["BEC Grade"]}
              onChange={handleChange("BEC Grade")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Languages Known *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL,ENGLISH"
              value={studentData["Languages Known"]}
              onChange={handleChange("Languages Known")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Gap In Education *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 0"
              value={studentData["Gap In Education"]}
              onChange={handleChange("Gap In Education")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Planning For Higher Studies *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("Is Higher Studies")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">PAN number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: AHMPR1212Q"
              value={studentData["PAN Number"]}
              onChange={handleChange("PAN Number")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Nationality *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: INDIAN"
              value={Nationality}
              onChange={handleChange("Nationality")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Indian Passport Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: J7854785"
              value={studentData["Indian Passport Number"]}
              onChange={handleChange("Indian Passport Number")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Aadhaar Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 223245657898"
              value={studentData["Aadhaar Number"]}
              onChange={handleChange("Aadhaar Number")}
            />
          </div>

          {/**FATHER RELATED*/}
          <div className="form-group">
            <label className="text-white">Father Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: RAMU R"
              value={studentData["Father Name"]}
              onChange={handleChange("Father Name")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Father Designation *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TEACHER"
              value={studentData["Father Designation"]}
              onChange={handleChange("Father Designation")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Father Organization *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: NLC"
              value={studentData["Father Organization"]}
              onChange={handleChange("Father Organization")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Father Mobile Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 9443435421"
              value={studentData["Father Mobile Number"]}
              onChange={handleChange("Father Mobile Number")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Father Mail ID *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ramu12@gmail.com"
              value={studentData["Father Mail ID"]}
              onChange={handleChange("Father Mail ID")}
            />
          </div>
          {/**MOTHER RELATED*/}
          <div className="form-group">
            <label className="text-white">Mother Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: SUTHA S"
              value={studentData["Mother Name"]}
              onChange={handleChange("Mother Name")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Mother Designation *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TEACHER"
              value={studentData["Mother Designation"]}
              onChange={handleChange("Mother Designation")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Mother Organization *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: NLC"
              value={studentData["Mother Organization"]}
              onChange={handleChange("Mother Organization")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Mother Mobile Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7894561237"
              value={studentData["Mother Mobile Number"]}
              onChange={handleChange("Mother Mobile Number")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Mother Mail ID *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: sutha12@gmail.com"
              value={studentData["Mother Mail ID"]}
              onChange={handleChange("Mother Mail ID")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Permanent Address *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 19/6, TYPE II , CAMPE 1 , THERMAL NAGAR , TUTICORIN"
              value={studentData["Permanent Address"]}
              onChange={handleChange("Permanent Address")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Permanent AddressLine 1 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 19/6, TYPE II , CAMPE 1"
              value={studentData["Permanent Address Line 1"]}
              onChange={handleChange("Permanent Address Line 1")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Permanent Address Line 2 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: THERMAL NAGAR , TUTICORIN"
              value={studentData["Permanent Address Line 2"]}
              onChange={handleChange("Permanent Address Line 2")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Permanent City *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TUTICORIN"
              value={studentData["Permanent City"]}
              onChange={handleChange("Permanent City")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">State *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL NADU"
              value={State}
              onChange={handleChange("State")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">PostalCode *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 628006"
              value={studentData["Postal Code"]}
              onChange={handleChange("Postal Code")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Hostel OR Dayscholar *</label>
            <Select
              options={[
                { value: "DAYSCHOLAR", label: "DAYSCHOLAR" },
                { value: "HOSTEL", label: "HOSTEL" },
              ]}
              onChange={handleChange("Hostel OR Day Scholar")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">POP2 Training *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("Is POP2 Training")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Any Future Skills *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("Future Skills")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Skill Set *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: Python,Full Stack Developer,Artificial Intelligence"
              value={studentData["Skill Set"]}
              onChange={handleChange("Skill Set")}
            />
          </div>

          <button
            className="btn btn-block btn-warning mt-4 font-weight-bold text-uppercase "
            onClick={OnEditSubmission}
            disabled={disabled}
          >
            Submit Profile
          </button>
        </form>

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
      </div>
    );
  };

  // profile page
  const StudentProfile = () => {
    return (
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          data-interval={false}
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="8"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="9"></li>
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="10"
            ></li>
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="11"
            ></li>
          </ol>
          <div className="carousel-inner">
            <div className="container-fluid my-5 carousel-item active">
              <div className="bg-darkblack  container shadow p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Register Number :
                    </span>
                    <span> {studentData["Register Number"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Roll Number :
                    </span>
                    <span> {studentData["Roll Number"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Full Name :
                    </span>
                    <span> {studentData["Full Name"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Title :
                    </span>
                    <span> {Title}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      First Name :
                    </span>
                    <span> {studentData["First Name"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Last Name :
                    </span>
                    <span> {studentData["Last Name"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Gender :
                    </span>
                    <span> {Gender}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      DOB (DD/MM/YYYY) :
                    </span>
                    <span> {studentData["DOB I"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      DOB (MM/DD/YYYY) :
                    </span>
                    <span> {studentData["DOB II"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      DOB (YYYY-MM-DD):
                    </span>
                    <span> {studentData["DOB III"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      College :
                    </span>
                    <span> {College}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Degree :
                    </span>
                    <span> {Degree}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Branch :
                    </span>
                    <span> {Branch}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Section :
                    </span>
                    <span> {Section}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Year Of Admission :
                    </span>
                    <span> {studentData["Year Of Admission"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Percentage :
                    </span>
                    <span> {studentData["Tenth Percentage"]}</span>
                  </li>

                  {/**newly added */}
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Board Of Study :
                    </span>
                    <span> {studentData["Tenth Board Of Study"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Medium Of Study :
                    </span>
                    <span> {studentData["Tenth Medium Of Study"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Year Of Passing :
                    </span>
                    <span> {studentData["Tenth Year Of Passing"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth School :
                    </span>
                    <span> {studentData["Tenth School Name"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Graduating State :
                    </span>
                    <span> {studentData["Tenth Graduating State"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Percentage :
                    </span>
                    <span> {studentData["Twelfth Percentage"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Board Of Study :
                    </span>
                    <span> {studentData["Twelfth Board Of Study"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Medium Of Study :
                    </span>
                    <span> {studentData["Twelfth Medium Of Study"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Year Of Passing :
                    </span>
                    <span> {studentData["Twelfth Year Of Passing"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth School :
                    </span>
                    <span> {studentData["Twelfth School Name"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Graduating State :
                    </span>
                    <span> {studentData["Twelfth Graduating State"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Diploma Specilazation OR Branch :
                    </span>
                    <span>
                      {" "}
                      {studentData["Diploma Specilazation OR Branch"]}
                    </span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Diploma Percentage :
                    </span>
                    <span> {studentData["Diploma Percentage"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Diploma Year Of Passing :
                    </span>
                    <span> {studentData["Diploma Year Of Passing"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Name Of Institute :
                    </span>
                    <span> {studentData["Name Of Institute"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Diploma Graduating State :
                    </span>
                    <span> {studentData["Diploma Graduating State"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 1 GPA :
                    </span>
                    <span> {studentData["Sem 1 GPA"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 2 GPA :
                    </span>
                    <span> {studentData["Sem 2 GPA"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 3 GPA :
                    </span>
                    <span> {studentData["Sem 3 GPA"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 4 GPA :
                    </span>
                    <span> {studentData["Sem 4 GPA"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 5 GPA :
                    </span>
                    <span> {studentData["Sem 5 GPA"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 6 GPA :
                    </span>
                    <span> {studentData["Sem 6 GPA"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 7 GPA :
                    </span>
                    <span> {studentData["Sem 7 GPA"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 8 GPA :
                    </span>
                    <span> {studentData["Sem 8 GPA"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      OverallCGPA :
                    </span>
                    <span> {studentData["Overall CGPA"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 1 :
                    </span>
                    <span> {studentData["Number Of Arrears Sem 1"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 2 :
                    </span>
                    <span> {studentData["Number Of Arrears Sem 2"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 3 :
                    </span>
                    <span> {studentData["Number Of Arrears Sem 3"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 4 :
                    </span>
                    <span> {studentData["Number Of Arrears Sem 4"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 5 :
                    </span>
                    <span> {studentData["Number Of Arrears Sem 5"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 6 :
                    </span>
                    <span> {studentData["Number Of Arrears Sem 6"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 7 :
                    </span>
                    <span> {studentData["Number Of Arrears Sem 7"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 8 :
                    </span>
                    <span> {studentData["Number Of Arrears Sem 8"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Total Number Of Standing Arrears :
                    </span>
                    <span>
                      {" "}
                      {studentData["Total Number Of Standing Arrears"]}
                    </span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Any History Of Arrears :
                    </span>
                    <span> {studentData["Is History Of Arrears"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of History Of Arrears :
                    </span>
                    <span> {studentData["Number Of History Of Arrears"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      LandLine Number :
                    </span>
                    <span> {studentData["Land Line Number"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Primary Number :
                    </span>
                    <span> {studentData["Primary Number"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Emergency Number :
                    </span>
                    <span> {studentData["Emergency Number"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Primary EmailID :
                    </span>
                    <span> {studentData["Primary Email ID"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Alternate EmailID :
                    </span>
                    <span> {studentData["Alternate Email ID"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sports Quota :
                    </span>
                    <span> {studentData["Sports Quota"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      BEC status :
                    </span>
                    <span> {studentData["BEC Status"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      BEC grade :
                    </span>
                    <span> {studentData["BEC Grade"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Languages Known :
                    </span>
                    <span> {studentData["Languages Known"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Gap In Education :
                    </span>
                    <span> {studentData["Gap In Education"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Planning Higher Studies :
                    </span>
                    <span> {studentData["Is Higher Studies"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      PAN number :
                    </span>
                    <span> {studentData["PAN Number"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Nationality :
                    </span>
                    <span> {Nationality}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Indian Passport Number :
                    </span>
                    <span> {studentData["Indian Passport Number"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Aadhaar Number :
                    </span>
                    <span> {studentData["Aadhaar Number"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Name :
                    </span>
                    <span> {studentData["Father Name"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Designation :
                    </span>
                    <span> {studentData["Father Designation"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Organization :
                    </span>
                    <span> {studentData["Father Organization"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Mobile Number :
                    </span>
                    <span> {studentData["Father Mobile Number"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Mail ID :
                    </span>
                    <span> {studentData["Father Mail ID"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Name :
                    </span>
                    <span> {studentData["Mother Name"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Designation :
                    </span>
                    <span> {studentData["Mother Designation"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Organization :
                    </span>
                    <span> {studentData["Mother Organization"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Mobile Number :
                    </span>
                    <span> {studentData["Mother Mobile Number"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Mail ID :
                    </span>
                    <span> {studentData["Mother Mail ID"]}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-darkblack  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Permanent Address :
                    </span>
                    <span> {studentData["Permanent Address"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Permanent Address Line 1 :
                    </span>
                    <span> {studentData["Permanent Address Line 1"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Permanent Address Line 2 :
                    </span>
                    <span> {studentData["Permanent Address Line 2"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Permanent City :
                    </span>
                    <span> {studentData["Permanent City"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      State :
                    </span>
                    <span> {State}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Postal Code :
                    </span>
                    <span> {studentData["Postal Code"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Hostel OR Dayscholar :
                    </span>
                    <span> {studentData["Hostel OR Day Scholar"]}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Is POP 2 Training :
                    </span>
                    <span> {studentData["Is POP2 Training"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Future Skills :
                    </span>
                    <span> {studentData["Future Skills"]}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Skill Set:
                    </span>
                    <span> {studentData["Skill Set"]}</span>
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-md-block">
            <a
              className="carousel-control-prev "
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
              style={{ width: "7%" }}
            >
              <span
                className="carousel-control-prev-icon "
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
          </div>

          <div className="d-none d-md-block">
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
              style={{ width: "7%" }}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <button
          className="container btn btn-block btn-warning font-weight-bold text-uppercase mt-4"
          onClick={() => setEditing(true)}
          disabled={disabled}
        >
          Edit Profile
        </button>
      </div>
    );
  };

  return (
    <div>
      <Menu />

      {editing ? EditProfile() : StudentProfile()}
      <div className="my-4 ">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
