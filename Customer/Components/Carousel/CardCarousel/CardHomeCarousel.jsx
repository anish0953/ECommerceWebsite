import "./CardHomeCarousel.css";
import React from "react";

const CardHomeCarousel = ({ product }) => {
  return (
    <div className="home-section-card">
      <div className="card-image-container">
        <img
          className="card-image"
          src={product.imageLink}
          alt="CardHomePageProduct"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{product.productName}</h3>
        <p className="card-description">Men Solid Pure Cotton Straight Kurta</p>
      </div>
    </div>
  );
};

export default CardHomeCarousel;
