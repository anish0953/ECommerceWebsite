import "react-alice-carousel/lib/alice-carousel.css";
import "./ProductCarousel.css";
import AliceCarousel from "react-alice-carousel";
import CardHomeCarousel from "./CardCarousel/CardHomeCarousel";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductCarousel = ({ carouselTitle }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsList();
  }, []);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4.5 },
  };

  const getProductsList = () => {
    let url = "http://localhost:8080/Product/getAllProducts";

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.slice(26, 36));
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Catch Block");
      });
  };

  return (
    <div className="HomeCarouselMainDiv my-5">
      <div className="HomeCarouselBody">
        <h1>{carouselTitle}</h1>
        <AliceCarousel
          items={products.map((product) => (
            <Link key={product.productId} to={`/product/${product.productId}`}>
              <CardHomeCarousel product={product} />
            </Link>
          ))}
          // disableButtonsControls
          disableDotsControls
          responsive={responsive}
        />
      </div>
    </div>
  );
};

export default ProductCarousel;
