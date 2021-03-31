import React, { useState, useEffect } from "react";
import Menu from "../template/Menu";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import { Scrollbars } from "rc-scrollbars";
import {
  updateFields,
  getFormsNameInAdmin,
  deleteForms,
} from "./helper/Adminapicalls";
import { isAuthenticated } from "../auth/helper";
//For the Success/Error Messages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import exportFromJSON from "export-from-json";

import { FaRegTrashAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

//For Input Type SELECT
import Select from "react-select";
import { searchForm } from "../StudentView/helper/StudentapiCalls";
const Forms = () => {
  const { student, token } = isAuthenticated();

  const [formDetails, setFormDetails] = useState([]);

  const [reload, setReload] = useState(false);

  const [createdForm, setCreatedForm] = useState([]);
  const [formName, setFormName] = useState("");
  const [description, setDescription] = useState("");

  const [displayFormName, setDisplayFormName] = useState(false);
  const [displayDescription, setDisplayDescription] = useState(false);

  const [batch, setBatch] = useState("");

  const [createTextField, setCreateTextField] = useState(false);

  const [columnname, setColumnname] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const exportType = "csv";

  //HANDLING INPUT
  const handleChange = (name) => (event) => {
    const value = name === "Batch" ? event.value : event.target.value;
    if (name === "columnname") setColumnname(value);
    if (name === "placeholder") setPlaceholder(value);
    if (name === "FormName") setFormName(value);
    if (name === "Description") setDescription(value);
    if (name === "Batch") setBatch(value);
  };

  //DELETE FIELD FUNCTION
  const deleteField = (field) => {
    return setCreatedForm(createdForm.filter((item) => item.id !== field.id));
  };

  //TEXT FIELD
  const TextField = (columnname, placeholder) => {
    setCreatedForm([
      ...createdForm,
      {
        columnname: `${columnname}`,
        input: `<input class="form-control ${formName}" placeholder="${placeholder}"  type="text" />`,
        id: uuidv4(),
      },
    ]);

    setColumnname("");
    setPlaceholder("");

    setCreateTextField(false);
  };

  const formDownload = (id, year, formName) => {
    searchForm(id, year).then((data) => {
      let fileName = formName;
      exportFromJSON({ data, fileName, exportType });
    });
  };

  //POSTING TO STUDENT SECTION
  const handleSubmit = () => {
    if (batch === "") return toast.error("Batch is required");
    let result = {
      FormName: formName,
      Description: description,
      Batch: batch,
      Values: createdForm,
    };
    updateFields(student._id, token, result)
      .then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else {
          setCreatedForm([]);
          setFormName("");
          setDescription("");
          setBatch("");
          setDisplayDescription(false);
          setDisplayFormName(false);
          toast.success(data.message);
          setReload(!reload);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteForm = (id, year) => {
    deleteForms(id, year).then((data) => {
      if (data?.error) {
        return toast.error(data.error);
      } else {
        toast.success(data.message);
        setReload(!reload);
      }
    });
  };

  useEffect(() => {
    getFormsNameInAdmin()
      .then((data) => {
        if (!data) {
          console.log("error");
        } else {
          setFormDetails(data.result);
        }
      })
      .catch((err) => console.log(err));
  }, [reload]);

  return (
    <div>
      <Menu />
      <div className="container my-5">
        <div className="form-group mb-4">
          <label className="text-white">Batch *</label>
          <Select
            options={[
              { value: "2018", label: "2018" },
              { value: "2019", label: "2019" },
              { value: "2020", label: "2020" },
              { value: "2021", label: "2021" },
              { value: "2022", label: "2022" },
              { value: "2023", label: "2023" },
              { value: "2024", label: "2024" },
              { value: "2025", label: "2025" },
              { value: "2026", label: "2026" },
              { value: "2027", label: "2027" },
            ]}
            onChange={handleChange("Batch")}
          />
        </div>

        <div className=" my-4 d-flex flex-row">
          <input
            type="text"
            value={formName}
            className="form-control flex-grow-1"
            placeholder="Give the Form name"
            onChange={handleChange("FormName")}
            disabled={displayFormName}
          />

          {!displayFormName && (
            <button
              className="btn mx-2 bg-warning text-center font-weight-bold  "
              style={{ height: "100%" }}
              onClick={() => {
                if (formName === "") return toast.error("formname is required");
                else return setDisplayFormName(true);
              }}
            >
              <span>+</span>
            </button>
          )}
          <button
            className=" btn bg-danger mx-2 font-weight-bold text-center "
            style={{ height: "100%" }}
            onClick={() => {
              setFormName("");
              setDisplayFormName(false);
            }}
          >
            <span>
              <FaRegTrashAlt />
            </span>
          </button>
        </div>

        <div className=" my-4 d-flex flex-row">
          <textarea
            value={description}
            className="form-control flex-grow-1"
            placeholder="Give the Description"
            onChange={handleChange("Description")}
            disabled={displayDescription}
          />

          {!displayDescription && (
            <button
              className="btn mx-2 bg-warning text-center font-weight-bold my-auto "
              style={{ height: "100%" }}
              onClick={() => {
                if (description === "")
                  return toast.error("form Description is required");
                else return setDisplayDescription(true);
              }}
            >
              <span>+</span>
            </button>
          )}
          <button
            className=" btn bg-danger mx-2 font-weight-bold text-center my-auto"
            style={{ height: "100%" }}
            onClick={() => {
              setDescription("");
              setDisplayDescription(false);
            }}
          >
            <span>
              <FaRegTrashAlt />
            </span>
          </button>
        </div>

        {!createTextField && (
          <div className=" my-4 d-flex flex-row ">
            <div className="form-control flex-grow-1">Text Field</div>
            <button
              className="btn mx-2 bg-warning text-center font-weight-bold  "
              style={{ height: "100%" }}
              onClick={() => {
                if (formName) return setCreateTextField(true);
                else return toast.error("Give the Form Name First");
              }}
            >
              <span>+</span>
            </button>
          </div>
        )}
        {createTextField && (
          <div className=" my-4 d-flex flex-row">
            <input
              type="text"
              className="form-control flex-grow-1"
              placeholder="Give the column name"
              value={columnname}
              onChange={handleChange("columnname")}
            />
            <input
              type="text"
              className="form-control ml-2"
              placeholder="Give the placeholder"
              value={placeholder}
              onChange={handleChange("placeholder")}
            />

            <button
              className="btn mx-2 bg-warning text-center font-weight-bold  "
              style={{ height: "100%" }}
              onClick={() => TextField(columnname, placeholder)}
            >
              <span>+</span>
            </button>
            <button
              className=" btn bg-danger font-weight-bold text-center "
              style={{ height: "100%" }}
              onClick={() => {
                setColumnname("");
                setPlaceholder("");
                return setCreateTextField(false);
              }}
            >
              <span>
                <FaRegTrashAlt />
              </span>
            </button>
          </div>
        )}

        {displayFormName && (
          <p className="h4 text-uppercase text-center text-white mt-5 px-3">
            {formName}
          </p>
        )}

        {createdForm.length > 0 && (
          <div className="container shadow-lg p-3 my-4">
            <Scrollbars
              autoHeight
              autoHeightMin={100}
              autoHeightMax={200}
              className="m-2"
            >
              {createdForm.map((field) => (
                <div key={field.id}>
                  <div className="form-group">
                    <label className="text-white  p-2 mx-2">
                      {field.columnname}
                    </label>
                    <div className=" d-flex flex-row ">
                      {parse(field.input)}

                      <button
                        className="btn mx-2 bg-danger text-center font-weight-bold  "
                        style={{ height: "100%" }}
                        onClick={() => deleteField(field)}
                      >
                        <span>
                          <FaRegTrashAlt />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Scrollbars>

            <button
              type="button"
              className=" container btn btn-block btn-warning my-3 font-weight-bold"
              onClick={handleSubmit}
            >
              POST
            </button>
          </div>
        )}

        {formDetails.length !== 0 &&
          formDetails.map((data) => (
            <div className=" my-4 d-flex flex-row" key={data._id}>
              <p className="mr-auto text-white text-uppercase h5 ">
                {data.FormName}
              </p>

              <button
                className="btn mx-2 bg-warning text-center font-weight-bold  "
                style={{ height: "100%" }}
                onClick={() =>
                  formDownload(data._id, data.Batch, data.FormName)
                }
              >
                <span className="font-weight-bold">
                  <FiDownload />
                </span>
              </button>

              <button
                className=" btn bg-danger mx-2 font-weight-bold text-center "
                style={{ height: "100%" }}
                onClick={() => deleteForm(data._id, data.Batch)}
              >
                <span>
                  <FaRegTrashAlt />
                </span>
              </button>
            </div>
          ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default Forms;
