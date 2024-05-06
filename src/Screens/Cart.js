import React from "react";
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { MdDelete } from "react-icons/md";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 fs-3 text-white text-center">The Cart is Empty!</div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

    const handleCheckOut = async () => {
      let userEmail = localStorage.getItem("userEmail");
      // console.log(data,localStorage.getItem("userEmail"),new Date())
      let response = await fetch("http://localhost:5000/api/OrderData", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      console.log("JSON RESPONSE:::::", response.status)
      if (response.status === 200) {
        dispatch({ type: "DROP" })
      }
    }

  return (
    
    <div className="">
      {console.log(data)}
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md ">
        <table className="table table-hover table-dark text-white">
          <thead className="fs-4 text-success">
            <tr >
              <th scope="col" className="text-success">#</th>
          <th scope="col" className="text-success">Name</th>
          <th scope="col" className="text-success">Quantity</th>
          <th scope="col" className="text-success">Option</th>
          <th scope="col" className="text-success">Amount</th>
          <th scope="col" className="text-success"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                
                <td>
                  <button type="button" className="btn p-0">
                  <MdDelete className="text-white" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 text-white " 
          onClick={handleCheckOut}
          >
            
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
