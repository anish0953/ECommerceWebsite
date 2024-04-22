import "./SearchPage.css";
import Footer from "../../Components/Footer/Footer";
import Form from "react-bootstrap/Form";
import Navbarr from "../../Components/Navbar/Navbarr";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ProductCarousel from "../../Components/Carousel/ProductCarousel";
import ProductListDashboard from "../DashBoard/DasboardBody/ProductListDashboard";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchedProductsList, setSearchedProductsList] = useState([]);
  const [isSearched, setisSearched] = useState(false);
  const onFormChange = (e) => {
    const searchedProductName = e.target.value;

    if (e.target.value.length > 0) {
      setisSearched(true);
      const url =
        "http://localhost:8080/Product/getProductsBySearch/" +
        searchedProductName;
      axios
        .get(url, {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Headers": "Content-type",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data);
            let responseData = response.data.map((product) => {
              return (
                <Link
                  to={`/product/${product.productId}`}
                  key={product.productId}
                >
                  <div>
                    <ProductCard product={product} />
                  </div>
                </Link>
              );
            });
            setSearchedProductsList(responseData);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Catch Block");
        });
    }
  };

  return (
    <div>
      <Navbarr />
      <div className="mb-3">
        <Form className="d-flex navsearchform mt-5">
          <Form.Control
            type="search"
            placeholder="Search here"
            className="me-2 navsearch"
            aria-label="Search"
            onChange={onFormChange}
          />
          <i className="fa-solid fa-magnifying-glass icons"></i>
        </Form>
      </div>
      <div className="CardDeck">{searchedProductsList}</div>
      {!isSearched && (
        <div>
          <ProductListDashboard />
          <ProductCarousel carouselTitle="Best footwears" />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Search;
