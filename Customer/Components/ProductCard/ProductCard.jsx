import "./ProductCard.css";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="productCard">
      <div className="productCard-container">
        <img className="productCard-img" src={product.imageLink} alt="" />
      </div>
      <div className="CardText">
        <div className="CardText-p">
          <h6 className="CardText-head">{product.productName}</h6>
          <p>{product.description}</p>
        </div>
        <div className="CardText-details">
          <p className="CardText-price">
            ₹ {(product.price * (1 - product.discount / 100)).toFixed(2)}
          </p>
          <p className="CardText-priceog">{product.price}</p>
          <p className="CardText-discount">{product.discount}% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
