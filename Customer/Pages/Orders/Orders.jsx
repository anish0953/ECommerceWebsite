import "./Orders.css";
import CardOrder from "./CardOrder";
import Footer from "../../Components/Footer/Footer";
import Navbarr from "../../Components/Navbar/Navbarr";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const userId = localStorage.getItem("userId");
  const [OrderDataFull, setOrderDataFull] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/Order/getAllOrdersByUserID/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setOrderDataFull(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  return (
    <div>
      <Navbarr />
      <div className="ordercont">
        <h1>My Orders</h1>
        <div className="orderslist">
          {OrderDataFull.map((order) => {
            return (
              <div className="my-4 boxofeachorder p-2">
                {/* <h6>Order id : {order.orderId}</h6> */}
                <div className="orderdeets m-2 mx-4">
                  <h6>Order Date : {order.orderDate}</h6>
                  <h6>
                    Order Amount : ₹ {Number(order.totalAmount).toFixed(2)}
                  </h6>
                  <h6>Order Address : {order.address.addressname}</h6>
                </div>

                {order.orderItems.map((orderitem) => {
                  return (
                    <div>
                      {/* {orderitem.productId} {orderitem.quantity}
                      {orderitem.orderItemId} */}
                      <CardOrder
                        productId={orderitem.productId}
                        quantity={orderitem.quantity}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
