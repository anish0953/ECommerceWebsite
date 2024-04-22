import "./CartBody.css";
import CartCard from "../../../Components/CartCard/CartCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartBody = () => {
  const userId = localStorage.getItem("userId");
  const [Cart, setCart] = useState([]);
  const [totalItemNo, settotalItemNo] = useState(0);
  const [totalAmount, setTotalAmount] = useState();
  const [quantityChange, setquantityChange] = useState();
  const navigate = useNavigate();

  const userTotal =
    Number(totalAmount) -
    Number(totalAmount) * 0.1 +
    Number(totalAmount) * 0.05 +
    40;

  const fetchQuantityChange = (quantity) => {
    setquantityChange(quantity);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/CartItem/getProductListByUserID/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setCart(response.data);
          settotalItemNo(response.data.length);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  // Error
  useEffect(() => {
    if (userId !== null) {
      axios
        .get(`http://localhost:8080/CartItem/TotalCartPriceByUserId/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            setTotalAmount(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, quantityChange]);

  const handleUpdateCart = (deletedItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== deletedItemId)
    );
  };

  const handleClearCart = () => {
    const url = `http://localhost:8080/CartItem/clearCart/${userId}`;

    axios
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          alert("Cart Deleted ");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    settotalItemNo(Cart.length);
  }, [Cart]);

  return (
    <div className="CartBody-container">
      <div className="CartBody-title">
        <div>My Cart Page</div>
        <div className="totalcart-items">Total Items : {totalItemNo}</div>
      </div>
      <div className="CartBody-body">
        {totalItemNo !== 0 ? (
          <>
            <div className="CartBody-cartItemsbody">
              <div className="CartBody-cartItems">
                {Cart.map((caritem) => (
                  <CartCard
                    cartItemId={caritem.cartItemId}
                    key={caritem.cartItemId}
                    userId={userId}
                    updateCart={handleUpdateCart}
                    fetchQuantityChange={fetchQuantityChange}
                  />
                ))}
              </div>
              <button
                className="btn btn-danger clearcartbtn"
                onClick={() => {
                  handleClearCart();
                }}
              >
                {" "}
                Clear Cart
              </button>
            </div>
            <div className="CartBody-details">
              <div className="price-details">Price Details</div>
              <div className="paymentdetails">
                <div className="payment-title">Bag Total</div>
                <div className="payment-price">Rs. {totalAmount}</div>
              </div>
              <div className="paymentdetails">
                <div className="payment-title">Bag Discount - 10%</div>
                <div className="payment-price">
                  -Rs. {(totalAmount * 0.1).toPrecision(2)}
                </div>
              </div>
              <div className="paymentdetails">
                <div className="payment-title">VAT/GST - 5%</div>
                <div className="payment-price">
                  Rs. {(totalAmount * 0.05).toPrecision(2)}
                </div>
              </div>
              <div className="paymentdetails">
                <div className="payment-title">Delivery</div>
                <div className="payment-price">Rs. 40</div>
              </div>{" "}
              <div className="paymentdetails">
                <div className="payment-title">Order Total</div>
                <div className="payment-price">
                  Rs. {Number(userTotal).toFixed(2)}
                </div>
              </div>
              <button
                className="btn btn-primary placeorderbtn"
                onClick={() => {
                  localStorage.setItem(
                    "cartTotal",
                    Number(userTotal).toFixed(2)
                  );

                  navigate("/checkout");
                }}
              >
                Place Order
              </button>
            </div>{" "}
          </>
        ) : (
          <button
            className="emptyCart"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Cart is Empty , Continue to Shop
          </button>
        )}
      </div>
    </div>
  );
};

export default CartBody;
