import "./CardOrder.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CardOrder = ({ productId,quantity}) => {
  const [ProductDetails, setProductDetails] = useState({});

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8080/Product/getProductById/${productId}`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setProductDetails(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [productId]);

  return (
    <div className="orderBox">
      <div className="individualproduct">
        <div className="pimg">
          <img src={ProductDetails.imageLink} alt="" srcSet="" />
        </div>
        <div className="boxxx">
          <h5 className="pname">{ProductDetails.productName}</h5>
          <div className="pdesc">{ProductDetails.description}</div>
          <div className="pcolor">{ProductDetails.color}</div>
        </div>
        <div className="pprice">{quantity}</div>
        <div className="pprice">{ProductDetails.price}</div>
      </div>
    </div>
  );
};

export default CardOrder;
