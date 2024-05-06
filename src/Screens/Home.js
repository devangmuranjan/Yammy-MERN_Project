import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setFoodCat(response[0]);
      setFoodItem(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-dark text-white">
      <div>
        <Navbar />
      </div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <div className="d-flex">
              <input type="text" className="form-control me-2 bg-dark text-white" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
            </div>
          </div>
          <div className="carousel-item active" data-bs-interval="2000">
            <img
              src="https://source.unsplash.com/random/900*700/?ice-cream"
              className="d-block w-100"
              alt="..."
              style={{
                height: "500px",
                objectFit: "cover",
                filter: "brightness(30%)",
              }}
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://source.unsplash.com/random/900*700/?burger"
              className="d-block w-100"
              alt="..."
              style={{
                height: "500px",
                objectFit: "cover",
                filter: "brightness(30%)",
              }}
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://source.unsplash.com/random/900*700/?pizza"
              className="d-block w-100"
              alt="..."
              style={{
                height: "500px",
                objectFit: "cover",
                filter: "brightness(30%)",
              }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem
                  .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map((filterItems) => (
                    <div className="col-12 col-md-6 col-lg-3" key={filterItems._id}>
                      <Card data={filterItems} 
                      options={filterItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div>Data Not Found</div>
              )}
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="text-white">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
