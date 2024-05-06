import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from '../Screens/Cart'
import { useCart } from "./ContextReducer";

const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Yammy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item ">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken")) ?
              <li className="nav-item ">
                <Link className="nav-link active" aria-current="page" to="/MyOrder">
                My  Orders
                </Link>
              </li>
              :""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
              
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/Login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">
                Signin
              </Link>
            </div>
              : <div>
                <div className="btn bg-white text-success mx-1" onClick={()=>{setCartView(true)}}>
                My Cart
                {data.length > 0 && (
            <Badge className="ms-2" pill bg="danger">
              {data.length}
            </Badge>
          )}
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                <div className="btn bg-white text-danger mx-1" onClick={handelLogout}>Logout</div>
              </div> 
              }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
