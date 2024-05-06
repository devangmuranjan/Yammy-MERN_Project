import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors[0].msg); // Display the first error message
      }

      // Handle successful login (navigate to a new page, update state, etc.)
      localStorage.setItem("userEmail", inputs.email);
      localStorage.setItem("authToken", data.authToken);
      console.log(data.authToken);
      navigate("/");
      console.log("Login successful");
      alert("login successfull");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return (
    <div className="vh-100 p-5 bg-dark text-white">
      <form className="h-100" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
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
            onChange={handleChange}
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
            id="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <Link to={"/createuser"} className="btn btn-danger ms-3">
          I'm a new User
        </Link>
      </form>
    </div>
  );
};

export default Login;
