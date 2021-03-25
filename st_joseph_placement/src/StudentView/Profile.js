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
    RegisterNumber: "",
    RollNumber: "",
    Title: "",
    Fullname: "",
    Firstname: "",
    Lastname: "",
    Gender: "",
    DOBI: "",
    DOBII: "",
    DOBIII: "",
    College: "",
    Degree: "",
    Branch: "",
    Section: "",
    YearOfAdmission: "",

    TenthPercentage: "",
    TenthBoardOfStudy: "",
    TenthMediumOfStudy: "",
    TenthYearOfPassing: "",
    TenthSchoolName: "",
    TenthGraduatingState: "",

    TwelfthPercentage: "",
    TwelfthBoardOfStudy: "",
    TwelfthMediumOfStudy: "",
    TwelfthYearOfPassing: "",
    TwelfthSchoolName: "",
    TwelfthGraduatingState: "",

    DiplomaSpecilazationORBranch: "",
    DiplomaPercentage: "",
    DiplomaYearOfPassing: "",
    NameOfInstitute: "",
    DiplomaGraduatingState: "",

    Sem1GPA: "",
    Sem2GPA: "",
    Sem3GPA: "",
    Sem4GPA: "",
    Sem5GPA: "",
    Sem6GPA: "",
    Sem7GPA: "",
    Sem8GPA: "",
    OverallCGPA: "",

    NumberOfArrearsSem1: "",
    NumberOfArrearsSem2: "",
    NumberOfArrearsSem3: "",
    NumberOfArrearsSem4: "",
    NumberOfArrearsSem5: "",
    NumberOfArrearsSem6: "",
    NumberOfArrearsSem7: "",
    NumberOfArrearsSem8: "",
    TotalNumberOfStandingArrears: "",
    IsHistoryOfArrears: "",
    NumberOfHistoryOfArrears: "",

    LandLineNumber: "",
    PrimaryNumber: "",
    EmergencyNumber: "",
    PrimaryEmailID: "",
    AlternateEmailID: "",

    SportsQuota: "",
    BECstatus: "",
    BECgrade: "",

    LanguagesKnown: "",
    GapInEducation: "",
    IsHigherStudies: "",

    PANnumber: "",
    Nationality: "",
    IndianPassportNumber: "",
    AadhaarNumber: "",

    FatherName: "",
    FatherDesignation: "",
    FatherOrganization: "",
    FatherMobileNumber: "",
    FatherMailID: "",

    MotherName: "",
    MotherDesignation: "",
    MotherOrganization: "",
    MotherMobileNumber: "",
    MotherMailID: "",

    PermanentAddress: "",
    PermanentAddressLine1: "",
    PermanentAddressLine2: "",
    PermanentCity: "",
    State: "",
    PostalCode: "",
    HostelORDayscholar: "",
    IsPOP2Training: "",
    FutureSkills: "",
  });

  //to disable edit profile button
  const [disabled, setDisabled] = useState(false);

  //for changing between editform and user profile
  const [editing, setEditing] = useState(false);

  //destructing the values
  const {
    RegisterNumber,
    RollNumber,
    Title,
    Fullname,
    Firstname,
    Lastname,
    Gender,
    DOBI,
    DOBII,
    DOBIII,
    College,
    Degree,
    Branch,
    Section,
    YearOfAdmission,

    TenthPercentage,
    TenthBoardOfStudy,
    TenthMediumOfStudy,
    TenthYearOfPassing,
    TenthSchoolName,
    TenthGraduatingState,

    TwelfthPercentage,
    TwelfthBoardOfStudy,
    TwelfthMediumOfStudy,
    TwelfthYearOfPassing,
    TwelfthSchoolName,
    TwelfthGraduatingState,

    DiplomaSpecilazationORBranch,
    DiplomaPercentage,
    DiplomaYearOfPassing,
    NameOfInstitute,
    DiplomaGraduatingState,

    Sem1GPA,
    Sem2GPA,
    Sem3GPA,
    Sem4GPA,
    Sem5GPA,
    Sem6GPA,
    Sem7GPA,
    Sem8GPA,
    OverallCGPA,

    NumberOfArrearsSem1,
    NumberOfArrearsSem2,
    NumberOfArrearsSem3,
    NumberOfArrearsSem4,
    NumberOfArrearsSem5,
    NumberOfArrearsSem6,
    NumberOfArrearsSem7,
    NumberOfArrearsSem8,
    TotalNumberOfStandingArrears,
    IsHistoryOfArrears,
    NumberOfHistoryOfArrears,

    LandLineNumber,
    PrimaryNumber,
    EmergencyNumber,
    PrimaryEmailID,
    AlternateEmailID,

    SportsQuota,
    BECstatus,
    BECgrade,

    LanguagesKnown,
    GapInEducation,
    IsHigherStudies,

    PANnumber,
    Nationality,
    IndianPassportNumber,
    AadhaarNumber,

    FatherName,
    FatherDesignation,
    FatherOrganization,
    FatherMobileNumber,
    FatherMailID,

    MotherName,
    MotherDesignation,
    MotherOrganization,
    MotherMobileNumber,
    MotherMailID,

    PermanentAddress,
    PermanentAddressLine1,
    PermanentAddressLine2,
    PermanentCity,
    State,
    PostalCode,
    HostelORDayscholar,
    IsPOP2Training,
    FutureSkills,
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
            RegisterNumber: data.RegisterNumber,
            RollNumber: data.RollNumber,
            Title: data.Title,
            Fullname: data.Fullname,
            Firstname: data.Firstname,
            Lastname: data.Lastname,
            Gender: data.Gender,
            DOBI: data.DOBI,
            DOBII: data.DOBII,
            DOBIII: data.DOBIII,
            College: data.College,
            Degree: data.Degree,
            Branch: data.Branch,
            Section: data.Section,
            YearOfAdmission: data.YearOfAdmission,

            TenthPercentage: data.TenthPercentage,
            TenthBoardOfStudy: data.TenthBoardOfStudy,
            TenthMediumOfStudy: data.TenthMediumOfStudy,
            TenthYearOfPassing: data.TenthYearOfPassing,
            TenthSchoolName: data.TenthSchoolName,
            TenthGraduatingState: data.TenthGraduatingState,

            TwelfthPercentage: data.TwelfthPercentage,
            TwelfthBoardOfStudy: data.TwelfthBoardOfStudy,
            TwelfthMediumOfStudy: data.TwelfthMediumOfStudy,
            TwelfthYearOfPassing: data.TwelfthYearOfPassing,
            TwelfthSchoolName: data.TwelfthSchoolName,
            TwelfthGraduatingState: data.TwelfthGraduatingState,

            DiplomaSpecilazationORBranch: data.DiplomaSpecilazationORBranch,
            DiplomaPercentage: data.DiplomaPercentage,
            DiplomaYearOfPassing: data.DiplomaYearOfPassing,
            NameOfInstitute: data.NameOfInstitute,
            DiplomaGraduatingState: data.DiplomaGraduatingState,

            Sem1GPA: data.Sem1GPA,
            Sem2GPA: data.Sem2GPA,
            Sem3GPA: data.Sem3GPA,
            Sem4GPA: data.Sem4GPA,
            Sem5GPA: data.Sem5GPA,
            Sem6GPA: data.Sem6GPA,
            Sem7GPA: data.Sem7GPA,
            Sem8GPA: data.Sem8GPA,
            OverallCGPA: data.OverallCGPA,

            NumberOfArrearsSem1: data.NumberOfArrearsSem1,
            NumberOfArrearsSem2: data.NumberOfArrearsSem2,
            NumberOfArrearsSem3: data.NumberOfArrearsSem3,
            NumberOfArrearsSem4: data.NumberOfArrearsSem4,
            NumberOfArrearsSem5: data.NumberOfArrearsSem5,
            NumberOfArrearsSem6: data.NumberOfArrearsSem6,
            NumberOfArrearsSem7: data.NumberOfArrearsSem7,
            NumberOfArrearsSem8: data.NumberOfArrearsSem8,
            TotalNumberOfStandingArrears: data.TotalNumberOfStandingArrears,
            IsHistoryOfArrears: data.IsHistoryOfArrears,
            NumberOfHistoryOfArrears: data.NumberOfHistoryOfArrears,

            LandLineNumber: data.LandLineNumber,
            PrimaryNumber: data.PrimaryNumber,
            EmergencyNumber: data.EmergencyNumber,
            PrimaryEmailID: data.PrimaryEmailID,
            AlternateEmailID: data.AlternateEmailID,

            SportsQuota: data.SportsQuota,
            BECstatus: data.BECstatus,
            BECgrade: data.BECgrade,

            LanguagesKnown: data.LanguagesKnown,
            GapInEducation: data.GapInEducation,
            IsHigherStudies: data.IsHigherStudies,

            PANnumber: data.PANnumber,
            Nationality: data.Nationality,
            IndianPassportNumber: data.IndianPassportNumber,
            AadhaarNumber: data.AadhaarNumber,

            FatherName: data.FatherName,
            FatherDesignation: data.FatherDesignation,
            FatherOrganization: data.FatherOrganization,
            FatherMobileNumber: data.FatherMobileNumber,
            FatherMailID: data.FatherMailID,

            MotherName: data.MotherName,
            MotherDesignation: data.MotherDesignation,
            MotherOrganization: data.MotherOrganization,
            MotherMobileNumber: data.MotherMobileNumber,
            MotherMailID: data.MotherMailID,

            PermanentAddress: data.PermanentAddress,
            PermanentAddressLine1: data.PermanentAddressLine1,
            PermanentAddressLine2: data.PermanentAddressLine2,
            PermanentCity: data.PermanentCity,
            State: data.State,
            PostalCode: data.PostalCode,
            HostelORDayscholar: data.HostelORDayscholar,
            IsPOP2Training: data.IsPOP2Training,
            FutureSkills: data.FutureSkills,
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
      name === "IsHistoryOfArrears" ||
      name === "HostelORDayscholar" ||
      name === "IsPOP2Training" ||
      name === "FutureSkills" ||
      name === "SportsQuota" ||
      name === "IsHigherStudies"
        ? event.value
        : event.target.value;

    if (
      name === "PrimaryEmailID" ||
      name === "AlternateEmailID" ||
      name === "FatherMailID" ||
      name === "MotherMailID"
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
        <form className=" container shadow-lg my-5 p-4">
          <div className="form-group">
            <label className="text-white">Register Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 312418205087"
              value={RegisterNumber}
              onChange={handleChange("RegisterNumber")}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-white">Roll Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg:18IT1209"
              value={RollNumber}
              onChange={handleChange("RollNumber")}
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
              value={Fullname}
              placeholder="Eg: WILSON ROY (incase of WILSON R)"
              onChange={handleChange("Fullname")}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white">First Name *</label>
            <input
              type="text"
              className="form-control"
              value={Firstname}
              placeholder="Eg: WILSON"
              onChange={handleChange("Firstname")}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white ">Last Name (if any)</label>
            <input
              type="text "
              className="form-control"
              placeholder="Eg: JOHN"
              value={Lastname}
              onChange={handleChange("Lastname")}
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
              value={DOBI}
              onChange={handleChange("DOBI")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">DOBII (MM/DD/YYYY) *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 12/10/2000"
              value={DOBII}
              onChange={handleChange("DOBII")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">DOBIII (YYYY-MM-DD) *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2000-12-10"
              value={DOBIII}
              onChange={handleChange("DOBIII")}
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
              value={YearOfAdmission}
              onChange={handleChange("YearOfAdmission")}
            />
          </div>

          {/** TENTH RELATED */}
          <div className="form-group">
            <label className="text-white">Tenth Percentage *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 97.6"
              value={TenthPercentage}
              onChange={handleChange("TenthPercentage")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Tenth Board Of Study *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: STATE BOARD"
              value={TenthBoardOfStudy}
              onChange={handleChange("TenthBoardOfStudy")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Tenth Medium Of Study *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ENGLISH"
              value={TenthMediumOfStudy}
              onChange={handleChange("TenthMediumOfStudy")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Tenth Year Of Passing *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2016"
              value={TenthYearOfPassing}
              onChange={handleChange("TenthYearOfPassing")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Tenth School Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ST THOMAS MATRICULATION HIGHER SECONDARY SCHOOL"
              value={TenthSchoolName}
              onChange={handleChange("TenthSchoolName")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Tenth Graduating State *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL NADU"
              value={TenthGraduatingState}
              onChange={handleChange("TenthGraduatingState")}
            />
          </div>

          {/** twelfth RELATED */}
          <div className="form-group">
            <label className="text-white">Twelfth Percentage *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 97.66"
              value={TwelfthPercentage}
              onChange={handleChange("TwelfthPercentage")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth Board Of Study *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: STATE BOARD"
              value={TwelfthBoardOfStudy}
              onChange={handleChange("TwelfthBoardOfStudy")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth Medium Of Study *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ENGLISH"
              value={TwelfthMediumOfStudy}
              onChange={handleChange("TwelfthMediumOfStudy")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth Year Of Passing *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2018"
              value={TwelfthYearOfPassing}
              onChange={handleChange("TwelfthYearOfPassing")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth School Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ST THOMAS MATRICULATION HIGHER SECONDARY SCHOOL"
              value={TwelfthSchoolName}
              onChange={handleChange("TwelfthSchoolName")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Twelfth Graduating State *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL NADU"
              value={TwelfthGraduatingState}
              onChange={handleChange("TwelfthGraduatingState")}
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
              value={DiplomaSpecilazationORBranch}
              onChange={handleChange("DiplomaSpecilazationORBranch")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Diploma Percentage *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 10"
              value={DiplomaPercentage}
              onChange={handleChange("DiplomaPercentage")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Diploma Year Of Passing *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 2019"
              value={DiplomaYearOfPassing}
              onChange={handleChange("DiplomaYearOfPassing")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Name Of Institute *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: JOHNS POLYTECHNIC"
              value={NameOfInstitute}
              onChange={handleChange("NameOfInstitute")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Diploma Graduating State *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL NADU"
              value={DiplomaGraduatingState}
              onChange={handleChange("DiplomaGraduatingState")}
            />
          </div>

          {/**sem related */}

          <div className="form-group">
            <label className="text-white">Sem 1 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={Sem1GPA}
              onChange={handleChange("Sem1GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 2 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={Sem2GPA}
              onChange={handleChange("Sem2GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 3 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={Sem3GPA}
              onChange={handleChange("Sem3GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 4 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={Sem4GPA}
              onChange={handleChange("Sem4GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 5 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={Sem5GPA}
              onChange={handleChange("Sem5GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 6 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={Sem6GPA}
              onChange={handleChange("Sem6GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 7 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={Sem7GPA}
              onChange={handleChange("Sem7GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Sem 8 GPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={Sem8GPA}
              onChange={handleChange("Sem8GPA")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Overall CGPA *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7.78"
              value={OverallCGPA}
              onChange={handleChange("OverallCGPA")}
            />
          </div>

          {/*arrear related*/}
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 1 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfArrearsSem1}
              onChange={handleChange("NumberOfArrearsSem1")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 2 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfArrearsSem2}
              onChange={handleChange("NumberOfArrearsSem2")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 3 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfArrearsSem3}
              onChange={handleChange("NumberOfArrearsSem3")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 4 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfArrearsSem4}
              onChange={handleChange("NumberOfArrearsSem4")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 5 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfArrearsSem5}
              onChange={handleChange("NumberOfArrearsSem5")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 6 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfArrearsSem6}
              onChange={handleChange("NumberOfArrearsSem6")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 7 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfArrearsSem7}
              onChange={handleChange("NumberOfArrearsSem7")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Number Of Arrears Sem 8 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfArrearsSem8}
              onChange={handleChange("NumberOfArrearsSem8")}
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
              value={TotalNumberOfStandingArrears}
              onChange={handleChange("TotalNumberOfStandingArrears")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Is History Of Arrears *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("IsHistoryOfArrears")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Number Of History Of Arrears *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 1"
              value={NumberOfHistoryOfArrears}
              onChange={handleChange("NumberOfHistoryOfArrears")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Land Line Number *</label>
            <input
              type="text"
              className="form-control"
              value={LandLineNumber}
              placeholder="Eg: 7513200000"
              onChange={handleChange("LandLineNumber")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Primary Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7871835412"
              value={PrimaryNumber}
              onChange={handleChange("PrimaryNumber")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Emergency Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 9442235412"
              value={EmergencyNumber}
              onChange={handleChange("EmergencyNumber")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Primary Email ID *</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Eg: robert123@gmail.com"
              value={PrimaryEmailID}
              onChange={handleChange("PrimaryEmailID")}
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
              value={AlternateEmailID}
              onChange={handleChange("AlternateEmailID")}
            />
          </div>

          <div className="form-group">
            <label className="text-white">Sports Quota *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("SportsQuota")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">BEC status *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: VANTAGE"
              value={BECstatus}
              onChange={handleChange("BECstatus")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">BEC grade *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: COUNCIL OF EUROPE LEVEL B2"
              value={BECgrade}
              onChange={handleChange("BECgrade")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Languages Known *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TAMIL,ENGLISH"
              value={LanguagesKnown}
              onChange={handleChange("LanguagesKnown")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Gap In Education *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 0"
              value={GapInEducation}
              onChange={handleChange("GapInEducation")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Planning For Higher Studies *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("IsHigherStudies")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">PAN number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: AHMPR1212Q"
              value={PANnumber}
              onChange={handleChange("PANnumber")}
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
              value={IndianPassportNumber}
              onChange={handleChange("IndianPassportNumber")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Aadhaar Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 223245657898"
              value={AadhaarNumber}
              onChange={handleChange("AadhaarNumber")}
            />
          </div>

          {/**FATHER RELATED*/}
          <div className="form-group">
            <label className="text-white">Father Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: RAMU R"
              value={FatherName}
              onChange={handleChange("FatherName")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Father Designation *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TEACHER"
              value={FatherDesignation}
              onChange={handleChange("FatherDesignation")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Father Organization *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: NLC"
              value={FatherOrganization}
              onChange={handleChange("FatherOrganization")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Father Mobile Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 9443435421"
              value={FatherMobileNumber}
              onChange={handleChange("FatherMobileNumber")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Father Mail ID *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: ramu12@gmail.com"
              value={FatherMailID}
              onChange={handleChange("FatherMailID")}
            />
          </div>
          {/**MOTHER RELATED*/}
          <div className="form-group">
            <label className="text-white">Mother Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: SUTHA S"
              value={MotherName}
              onChange={handleChange("MotherName")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Mother Designation *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TEACHER"
              value={MotherDesignation}
              onChange={handleChange("MotherDesignation")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Mother Organization *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: NLC"
              value={MotherOrganization}
              onChange={handleChange("MotherOrganization")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Mother Mobile Number *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 7894561237"
              value={MotherMobileNumber}
              onChange={handleChange("MotherMobileNumber")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Mother Mail ID *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: sutha12@gmail.com"
              value={MotherMailID}
              onChange={handleChange("MotherMailID")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Permanent Address *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 19/6, TYPE II , CAMPE 1 , THERMAL NAGAR , TUTICORIN"
              value={PermanentAddress}
              onChange={handleChange("PermanentAddress")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Permanent AddressLine 1 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: 19/6, TYPE II , CAMPE 1"
              value={PermanentAddressLine1}
              onChange={handleChange("PermanentAddressLine1")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Permanent Address Line 2 *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: THERMAL NAGAR , TUTICORIN"
              value={PermanentAddressLine2}
              onChange={handleChange("PermanentAddressLine2")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Permanent City *</label>
            <input
              type="text"
              className="form-control"
              placeholder="Eg: TUTICORIN"
              value={PermanentCity}
              onChange={handleChange("PermanentCity")}
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
              value={PostalCode}
              onChange={handleChange("PostalCode")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Hostel OR Dayscholar *</label>
            <Select
              options={[
                { value: "DAYSCHOLAR", label: "DAYSCHOLAR" },
                { value: "HOSTEL", label: "HOSTEL" },
              ]}
              onChange={handleChange("HostelORDayscholar")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">POP2 Training *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("IsPOP2Training")}
            />
          </div>
          <div className="form-group">
            <label className="text-white">Any Future Skills *</label>
            <Select
              options={[
                { value: "YES", label: "YES" },
                { value: "NO", label: "NO" },
              ]}
              onChange={handleChange("FutureSkills")}
            />
          </div>

          <button
            className="btn btn-block btn-warning mt-4"
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
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Register Number :
                    </span>
                    <span> {RegisterNumber}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Roll Number :
                    </span>
                    <span> {RollNumber}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Full Name :
                    </span>
                    <span> {Fullname}</span>
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
                    <span> {Firstname}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Last Name :
                    </span>
                    <span> {Lastname}</span>
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
                    <span> {DOBI}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      DOB (MM/DD/YYYY) :
                    </span>
                    <span> {DOBII}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      DOB (YYYY-MM-DD):
                    </span>
                    <span> {DOBIII}</span>
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
                    <span> {YearOfAdmission}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Percentage :
                    </span>
                    <span> {TenthPercentage}</span>
                  </li>

                  {/**newly added */}
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Board Of Study :
                    </span>
                    <span> {TenthBoardOfStudy}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Medium Of Study :
                    </span>
                    <span> {TenthMediumOfStudy}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Year Of Passing :
                    </span>
                    <span> {TenthYearOfPassing}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth School :
                    </span>
                    <span> {TenthSchoolName}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Tenth Graduating State :
                    </span>
                    <span> {TenthGraduatingState}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Percentage :
                    </span>
                    <span> {TwelfthPercentage}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Board Of Study :
                    </span>
                    <span> {TwelfthBoardOfStudy}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Medium Of Study :
                    </span>
                    <span> {TwelfthMediumOfStudy}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Year Of Passing :
                    </span>
                    <span> {TwelfthYearOfPassing}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth School :
                    </span>
                    <span> {TwelfthSchoolName}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Twelfth Graduating State :
                    </span>
                    <span> {TwelfthGraduatingState}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Diploma Specilazation OR Branch :
                    </span>
                    <span> {DiplomaSpecilazationORBranch}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Diploma Percentage :
                    </span>
                    <span> {DiplomaPercentage}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Diploma Year Of Passing :
                    </span>
                    <span> {DiplomaYearOfPassing}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Name Of Institute :
                    </span>
                    <span> {NameOfInstitute}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Diploma Graduating State :
                    </span>
                    <span> {DiplomaGraduatingState}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 1 GPA :
                    </span>
                    <span> {Sem1GPA}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 2 GPA :
                    </span>
                    <span> {Sem2GPA}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 3 GPA :
                    </span>
                    <span> {Sem3GPA}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 4 GPA :
                    </span>
                    <span> {Sem4GPA}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 5 GPA :
                    </span>
                    <span> {Sem5GPA}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 6 GPA :
                    </span>
                    <span> {Sem6GPA}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 7 GPA :
                    </span>
                    <span> {Sem7GPA}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sem 8 GPA :
                    </span>
                    <span> {Sem8GPA}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      OverallCGPA :
                    </span>
                    <span> {OverallCGPA}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 1 :
                    </span>
                    <span> {NumberOfArrearsSem1}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 2 :
                    </span>
                    <span> {NumberOfArrearsSem2}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 3 :
                    </span>
                    <span> {NumberOfArrearsSem3}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 4 :
                    </span>
                    <span> {NumberOfArrearsSem4}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 5 :
                    </span>
                    <span> {NumberOfArrearsSem5}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 6 :
                    </span>
                    <span> {NumberOfArrearsSem6}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 7 :
                    </span>
                    <span> {NumberOfArrearsSem7}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of Arrears Sem 8 :
                    </span>
                    <span> {NumberOfArrearsSem8}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Total Number Of Standing Arrears :
                    </span>
                    <span> {TotalNumberOfStandingArrears}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Any History Of Arrears :
                    </span>
                    <span> {IsHistoryOfArrears}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Number Of History Of Arrears :
                    </span>
                    <span> {NumberOfHistoryOfArrears}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      LandLine Number :
                    </span>
                    <span> {LandLineNumber}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Primary Number :
                    </span>
                    <span> {PrimaryNumber}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Emergency Number :
                    </span>
                    <span> {EmergencyNumber}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Primary EmailID :
                    </span>
                    <span> {PrimaryEmailID}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Alternate EmailID :
                    </span>
                    <span> {AlternateEmailID}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Sports Quota :
                    </span>
                    <span> {SportsQuota}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      BEC status :
                    </span>
                    <span> {BECstatus}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      BEC grade :
                    </span>
                    <span> {BECgrade}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Languages Known :
                    </span>
                    <span> {LanguagesKnown}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Gap In Education :
                    </span>
                    <span> {GapInEducation}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Planning Higher Studies :
                    </span>
                    <span> {IsHigherStudies}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      PAN number :
                    </span>
                    <span> {PANnumber}</span>
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
                    <span> {IndianPassportNumber}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Aadhaar Number :
                    </span>
                    <span> {AadhaarNumber}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Name :
                    </span>
                    <span> {FatherName}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Designation :
                    </span>
                    <span> {FatherDesignation}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Organization :
                    </span>
                    <span> {FatherOrganization}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Mobile Number :
                    </span>
                    <span> {FatherMobileNumber}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Father Mail ID :
                    </span>
                    <span> {FatherMailID}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Name :
                    </span>
                    <span> {MotherName}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Designation :
                    </span>
                    <span> {MotherDesignation}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Organization :
                    </span>
                    <span> {MotherOrganization}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Mobile Number :
                    </span>
                    <span> {MotherMobileNumber}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Mother Mail ID :
                    </span>
                    <span> {MotherMailID}</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="container-fluid my-5 carousel-item ">
              <div className="bg-dark  container shadow-lg p-3">
                <div className="list-group">
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Permanent Address :
                    </span>
                    <span> {PermanentAddress}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Permanent Address Line 1 :
                    </span>
                    <span> {PermanentAddressLine1}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Permanent Address Line 2 :
                    </span>
                    <span> {PermanentAddressLine2}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Permanent City :
                    </span>
                    <span> {PermanentCity}</span>
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
                    <span> {PostalCode}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Hostel OR Dayscholar :
                    </span>
                    <span> {HostelORDayscholar}</span>
                  </li>

                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Is POP 2 Training :
                    </span>
                    <span> {IsPOP2Training}</span>
                  </li>
                  <li className="list-group-item p-4">
                    <span className="font-weight-bold text-uppercase">
                      Future Skills :
                    </span>
                    <span> {FutureSkills}</span>
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
          className="container btn btn-block btn-warning my-3"
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
