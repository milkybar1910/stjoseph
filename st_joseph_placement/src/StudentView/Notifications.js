import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Menu from "../template/Menu";
import {
  getNotifications,
  DynamicUpdateStudent,
  getStudentForNotifications,
} from "./helper/StudentapiCalls";
import { isAuthenticated } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  const [formDetails, setFormDetails] = useState([]);
  const [finalForm, setFinalForm] = useState({});

  const [redirect, setRedirect] = useState(false);

  const { student, token } = isAuthenticated();

  useEffect(() => {
    const { student, token } = isAuthenticated();

    const getNotified = (studentPropertiesColumn) => {
      return getNotifications(student["Year Of Admission"])
        .then((data) => {
          let result = data.result.filter((data) => {
            return studentPropertiesColumn.includes(data._id) === false;
          });

          setFormDetails(result);
        })
        .catch((err) => console.log(err));
    };
    async function StudentNotification() {
      let studentCols = await getStudentForNotifications(
        student._id,
        token
      ).then((data) => data);
      return getNotified(studentCols);
    }
    StudentNotification();
  }, [redirect]);

  const handleSubmit = (e, form) => {
    e.preventDefault();

    finalForm["_id"] = form._id;
    finalForm["student_id"] = student._id;

    var inputTag = document.getElementsByClassName(`${form.FormName}`);

    let inputValue = [];
    let count = -1;

    for (let item of inputTag) {
      inputValue[++count] = item.value;
    }

    form.Values.map((data, index) => {
      var colName = data.columnname;
      finalForm[colName] = inputValue[index];
      return true;
    });

    DynamicUpdateStudent(student._id, token, finalForm)
      .then((data) => {
        toast.success(data.message);
        setFinalForm([]);
        setRedirect(!redirect);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Menu length={formDetails.length} />

      {formDetails.map((data) => (
        <form className=" container shadow-lg my-5 p-4 bg-white" key={data._id}>
          <p className="text-center text-uppercase  h4 ">{data.FormName}</p>
          <p className="text-center  lead  text-justify text-wrap">
            {data.Description}
          </p>
          {data.Values.map((datas) => (
            <div className="form-group " key={datas.id}>
              <label className="font-weight-bold">{datas.columnname}</label>
              {parse(datas.input)}
            </div>
          ))}
          <button
            className="btn btn-dark mt-4 btn-block"
            onClick={(e) => handleSubmit(e, data)}
          >
            SUBMIT
          </button>
        </form>
      ))}

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
export default Notifications;
