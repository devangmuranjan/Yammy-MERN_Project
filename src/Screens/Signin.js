import { Alert } from "bootstrap";
import { useState } from "react";
import React from "react";
import { Link , useNavigate } from "react-router-dom";

const Signin = () => {

  let navigate = useNavigate()
  
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const onChange = (event) => {
    setinputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        location: inputs.location,
      }),
    });
    const text = await response.text();
    console.log(text);
    alert("Your Account has been Created");
    // 
  };
  return (
    <>
      <div className="vh-100 bg-dark p-5 text-white">
        <form className="" onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={inputs.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={inputs.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id=""
              name="password"
              value={inputs.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={inputs.location}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
            <Link to={"/login"} className="btn
            btn-danger ms-3">already have account</Link>
          
        </form>
      </div>
    </>
  );
};

export default Signin;
