import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { createComplaint} from "./helper/contactHelper"
import { removeFromLocalStorage } from '../core/helper/coreapicalls';



const Contact =()=> {


    const [error, setError] = useState({
      error:true
    })

    const [values, setValues] = useState({
          photo: "",
          transactionId:"",
          name:"",
          accNo:"",
          IFSC:"",
          loading: false,
          getaRedirect: false,
          formData: ""
        });
      
        const {photo,name,accNo,IFSC,loading,getaRedirect,formData} = values;
        
        const preload = () => {
              setValues({ ...values, formData: new FormData() }); 
        };
      
        useEffect(() => {
          preload();
        }, []);


    const handleChange = name => event => {
      const value = name === "photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };

    

    const onComplaint = event =>{
      event.preventDefault();
      createComplaint(formData).then(data => {
        if (data.error) {
          setError({...error,error:true})
          setValues({...values,loading:true})
        } else {
          if(removeFromLocalStorage()){
          setError({...error,error:false})
          setValues({
            ...values,
            photo: "",
            transactionId:"",
            name:"",
            accNo:"",
            IFSC:"",
            loading:false,
            formData:new FormData(),
            getaRedirect:true
          });}else{
            setError({...error,error:true})
          setValues({...values,loading:true})
          }
        }
      });
    }

    const redirect = () => {
      if(getaRedirect){
      setTimeout(() => {
          window.history.back()
        }
    , 3000);
    }
    }

    const reload= () => {
      if(loading){
      setTimeout(() => {
        window.history.go(0)
        }
    , 3000);
    }
    }

    const successMessage = () => (
          <div
            className="container alert alert-success mt-3"
            style={{ display: error.error ? "none" : "" }}
          >
            <h4>Complaint Raised Successfully</h4>
            {redirect()}
          </div>
        );

    const errorMessage = () => (
          <div
            className="container alert alert-danger mt-3"
            style={{ display: loading ? "" : "none" }}
          >
            <h4>Request Failed,Try again later</h4>
            {reload()}
          </div>
        );

    const paymentForm =() =>(
     
        <form>
        <div className="form-group">
        <p className="bg-success text-center p-2 text-white">PROVIDE THE SCREENSHOT OF YOUR EXPIRED COURSE BELOW</p>
        </div>
          <div className="form-group">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
                className="form-control"
              />
          </div>
            <div>
            <div className="form-group mt-3">
            <input
             onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Recipient name"
              value={name}
            />
          </div>
            <div className="form-group ">
            <input
              onChange={handleChange("accNo")}
              name="accNo"
              className="form-control"
              placeholder="Account Number"
              type="number"
              value={accNo}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("IFSC")}
              name="IFSC"
              className="form-control"
              placeholder="IFSC"
              value={IFSC}
            />
          </div>
         </div>
          <button
            type="submit"
            className="btn btn-outline-success mb-3"
            onClick={onComplaint}
          >
              Raise Complaint
          </button>
        </form>
        
    )
    return (
        <div>
        <div className="container-fluid ">
          <div className="jumbotron jumbotron-fluid bg-dark text-white text-center">
              <p className="display-4 ">COURSEHUB</p>
              <p className="lead">Make it work, make it right, make it fast</p>
          </div>
        </div>
        <div className="container">
        {paymentForm()}
        {errorMessage()}
        {successMessage()}
        </div>
        <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <p className="lead">We apologize for the inconvenience </p>
                    <Link className="btn btn-warning" to="/" >Go Back</Link>
                </div>
                <div className="container text-center">
                <span className="text-muted">
            Designed and built by <a href="https://www.linkedin.com/in/siva-shankar-s-r-839664192/" className="text-white" target="_blank">Siva</a> and <a href="https://www.linkedin.com/in/pradeep-saravanan-b0a801160/" className="text-white" target="_blank">Pradeep</a>
          </span>
               
                </div>
            </footer>
            </div>
    );
}

 
export default Contact;
