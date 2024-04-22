import "./SubcategoryDisplay.css";
import Footer from "./../../Components/Footer/Footer";
import Navbarr from "./../../Components/Navbar/Navbarr";
import ProductCard from "../../Components/ProductCard/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const SubcategoryDisplay = () => {
  const { subcategoryID } = useParams();
  const { subcategoryName } = useParams();
  const { categoryName } = useParams();
  const [ProductsList, setProductsList] = useState([]);

  useEffect(() => {
    if (subcategoryID) {
      axios
        .get(
          `http://localhost:8080/Product/searchBySubcategoryID/${subcategoryID}`
        )
        .then((response) => {
          if (response.status === 200) {
            let responseData = response.data.map((product) => {
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
          console.error(error);
        });
    }
  }, [subcategoryID]);

  return (
    <div>
      <Navbarr />
      <div className="displaySubcategory">
        <h1>
          {categoryName}'s {subcategoryName} Section
        </h1>
        <div className="productListContainer">{ProductsList}</div>
      </div>
      <Footer />
    </div>
  );
};

export default SubcategoryDisplay;
