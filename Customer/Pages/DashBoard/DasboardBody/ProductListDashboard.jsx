import "./ProductListDashboard.css";
import ProductCard from "./../../../Components/ProductCard/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductListDashboard = () => {
  const [ProductsList, setProductsList] = useState([]);

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    let url = "http://localhost:8080/Product/getAllProducts";

    axios
      .get(url, {
        header: {
          "Content-type": "application/json",
          "Access-Control-Allow-Headers": "Content-type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data);
          let responseData = response.data.slice(18, 34).map((product) => {
            return (
              <div key={product.productId}>
                <Link to={`/product/${product.productId}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            );
          });
          setProductsList(responseData);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Catch Block");
      });
  };
  return (
    <div>
      <h2
        style={{ fontWeight: "bold", fontSize: "40px" }}
        className="text-center"
      >
        TRENDING
      </h2>
      <div className="CardDeck">{ProductsList}</div>
    </div>
  );
};

export default ProductListDashboard;
