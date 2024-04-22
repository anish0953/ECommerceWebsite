import "./CardProduct.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CardProduct = ({ cartItemId }) => {
  const [productID, setproductID] = useState();
  const [ProductDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    if (cartItemId !== null) {
      axios
        .get(
          `http://localhost:8080/CartItem/findProductIdByCartItemId/${cartItemId}`
        )
        .then((response) => {
          if (response.status === 200) {
            setproductID(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(
          `http://localhost:8080/CartItem/findQuantityByCartItemId/${cartItemId}`
        )
        .then((response) => {
          if (response.status === 200) {
            setQuantity(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cartItemId]);

  useEffect(() => {
    if (productID) {
      axios
        .get(`http://localhost:8080/Product/getProductById/${productID}`)
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
  }, [productID]);
  return (
    <div>
      <div className="summarycard m-1 my-3">
        <div className="productdetails">
          <h6 className="pname">{ProductDetails.productName}</h6>
          <div className="pdesc">{ProductDetails.description}</div>
          <div className="pname">{ProductDetails.color}</div>
          <div className="pquant">Quantity: {quantity}</div>
        </div>
        <h6 className="pricep">₹ {ProductDetails.price}</h6>
      </div>
    </div>
  );
};

export default CardProduct;
