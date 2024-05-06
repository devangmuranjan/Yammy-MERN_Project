import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from '../components/ContextReducer';

const Card = (props) => {
  // Get cart state and dispatch function from context
  let cart = useCart();
  const dispatch = useDispatchCart();

  // Ref for price select input
  let priceRef = useRef();

  // Extract props
  let options = props.options;
  let data = props.data;

  // State for quantity and size selection
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  // Calculate final price based on quantity and size
  let finalPrice = qty * parseInt(options[size]);

  // Function to handle adding item to cart
  const handleAddToCart = async () => {
    // Check if item already exists in cart
    let food = cart.find(item => item.id === data._id);

    // If item exists
    if (food !== undefined) {
      // Update quantity and size if size matches
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: data._id, price: finalPrice, qty: qty, size: size, img: data.img })
      } else { // Add as new item if size doesn't match
        await dispatch({ type: "ADD", id: data._id, name: data.name, price: finalPrice, qty: qty, size: size, img: data.img })
      }
    } else { // Add as new item if item doesn't exist in cart
      await dispatch({ type: "ADD", id: data._id, name: data.name, price: finalPrice, qty: qty, size: size, img: data.img })
    }
  }

  // Set size state on component mount
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="">
      <div className="card mt-3 border" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={data.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "cover" }} />
        <div className="card-body bg-dark text-white justify-content-center">
          <h5 className="card-title">{data.name}</h5>
          {/* Select input for quantity */}
          <select className="m-2 h-100 bg-success rounded" name="" id="" onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {/* Select input for size */}
          <select className="m-2 h-100 bg-success rounded" ref={priceRef} name="" id="" onChange={(e) => setSize(e.target.value)}>
            {Object.keys(options).map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          {/* Display final price */}
          <div className="fs-5 d-inline bg-dark text-white">₹{finalPrice}/-</div>
          <hr />
          {/* Button to add item to cart */}
          <button className="btn btn-success" onClick={handleAddToCart}>Add Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
