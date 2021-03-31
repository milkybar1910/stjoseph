import React, { useEffect, useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import MainPageIllustraion from "../assets/svg/MainPageIllustration.js";
import "../style.css";

const MainPage = () => {
  const [signup, setSignup] = useState(true);
  const [signin, setSignin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
  }, []);

  return (
    <div>
      <header className="m-5 ">
        <h1 className="text-center text-white">
          ST.JOSEPH'S INSTITUTE OF TECHNOLOGY
        </h1>
        <p className="lead text-center text-white"> OMR , CHENNAI - 600 119</p>
      </header>

      <div className="container-fluid my-4">
        <div className="row align-items-center">
          <div className=" col-sm-12 col-md-6 ">
            <MainPageIllustraion />
          </div>
          <div className="col-sm-12 col-md-6">
            <div
              className="card text-white  mb-3 container shadow"
              style={{
                backgroundColor: "#1f2225",
              }}
            >
              <div className="card-header  mt-3">
                <div className="row">
                  <div className="col-6">
                    {" "}
                    <button
                      className="btn btn-block btn-warning mr-2 "
                      onClick={() => {
                        setSignup(true);
                        setSignin(false);
                      }}
                    >
                      Signup
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-block btn-warning mr-2"
                      onClick={() => {
                        setSignup(false);
                        setSignin(true);
                      }}
                    >
                      Signin
                    </button>
                  </div>
                </div>
              </div>
              {signup && <Signup />}
              {signin && <Signin />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
