import "./ProductPage.css";
import Footer from "../../Components/Footer/Footer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Navbarr from "../../Components/Navbar/Navbarr";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [ProductDetail, setProductDetail] = useState([]);

  const userID = localStorage.getItem("userId");
  const [isProductAlreadyPresent, setisProductAlreadyPresent] = useState(false);

  const [isPresentinWishlist, setIsPresentinWishlist] = useState(false);

  const { productID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductAlreadyPresent, isPresentinWishlist]);

  useEffect(() => {
    if (userID !== null && productID) {
      const urlforcart = `http://localhost:8080/CartItem/CheckPresentbyProductIDandUserID/${productID}/${userID}`;
      axios
        .post(urlforcart)
        .then((response) => {
          setisProductAlreadyPresent(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log("Catch Block");
          console.log(error);
        });
    }
  }, [isProductAlreadyPresent, productID, userID]);

  useEffect(() => {
    if (userID !== null && productID) {
      const urlwishlist = `http://localhost:8080/Wishlist/CheckPresentbyProductIDandUserID/${productID}/${userID}`;
      axios
        .post(urlwishlist)
        .then((response) => {
          setIsPresentinWishlist(response.data);
        })
        .catch((error) => {
          console.log("Catch Block");
          console.log(error);
        });
    }
  }, [isPresentinWishlist, productID, userID]);

  const addProductToCardwithUIDandPID = () => {
    if (userID === null) {
      alert("Please Login to add item to cart");
    } else {
      let url = `http://localhost:8080/CartItem/addProductToCartbyUserIdandPID/${userID}/${productID}`;

      axios
        .post(url)
        .then((response) => {
          if (response.status === 200) {
            alert("Product Added successfully!");
            setisProductAlreadyPresent(true);
          }
        })
        .catch((error) => {
          alert("User Login Required");
          console.log(error);
        });
    }
  };

  const addProductToWishlist = () => {
    if (userID === null) {
      alert("Please Login to add item to Wishlist");
    } else {
      let url = `http://localhost:8080/Wishlist/addProductToWishlistByUserIdAndProductId/${userID}/${productID}`;

      axios
        .post(url)
        .then((response) => {
          if (response.status === 200) {
            alert("Product Added successfully to Wishlist!");
            setIsPresentinWishlist(true);
          }
        })
        .catch((error) => {
          alert("User Login Required");
          console.log(error);
        });
    }
  };

  const getProductByID = () => {
    let url = `http://localhost:8080/Product/getProductById/${productID}`;

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
          const ProdDetails = response.data;
          let responseData = (
            <div className="product_body">
              <div className="product_image">
                <img src={ProdDetails.imageLink} alt="" srcSet="" />
              </div>
              <div className="product_detail text-center">
                <div className="product_details_basics">
                  <h1>{ProdDetails.productName}</h1>
                  <h5>{ProdDetails.description}</h5>
                  <h4>₹{(ProdDetails.price * 0.9).toFixed(0)}</h4>
                  <p>MRP₹{ProdDetails.price} (10% OFF)</p>
                </div>
                <hr className="solid" />

                <div className="product_color_size">
                  <h5>
                    Color -{">"} <span>{ProdDetails.color}</span>
                  </h5>
                  Select Size (UK) -{">"} <br />
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue="M"
                    >
                      <FormControlLabel
                        value="S"
                        control={<Radio />}
                        label="S"
                      />
                      <FormControlLabel
                        value="M"
                        control={<Radio />}
                        label="M"
                      />
                      <FormControlLabel
                        value="L"
                        control={<Radio />}
                        label="L"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <hr className="solid" />
                <div className="product_buy">
                  {userID !== null ? (
                    isProductAlreadyPresent ? (
                      <button
                        className="btn btn-primary buy"
                        onClick={() => {
                          navigate("/cart");
                        }}
                      >
                        <i className="fa-solid fa-bag-shopping"></i> View in
                        Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary buy"
                        onClick={() => {
                          addProductToCardwithUIDandPID();
                        }}
                      >
                        <i className="fa-solid fa-bag-shopping"></i> Add to bag
                      </button>
                    )
                  ) : (
                    <button
                      className="btn btn-primary buy"
                      onClick={() => {
                        alert("Please Login to Add to Cart");
                      }}
                    >
                      <i className="fa-solid fa-bag-shopping"></i> Login to Add
                    </button>
                  )}
                  {/* Add to cart end */}
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    HANDPICKED STYLES | ASSURED QUALITY
                  </p>
                  {/* Wishlist */}

                  {userID !== null ? (
                    isPresentinWishlist ? (
                      <button
                        className="btn btn-outline-primary wishlist"
                        onClick={() => {
                          navigate("/wishlist");
                        }}
                      >
                        <i className="fa-regular fa-heart"></i> View in wishlist
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-primary wishlist"
                        onClick={() => {
                          addProductToWishlist();
                        }}
                      >
                        <i className="fa-regular fa-heart"></i>
                        Save to wishlist
                      </button>
                    )
                  ) : (
                    <button
                      className="btn btn-outline wishlist"
                      onClick={() => {
                        alert("Please Login to Add to wishlist");
                      }}
                    >
                      <i className="fa-regular fa-heart"></i> Save to wishlist
                    </button>
                  )}
                  {/* Wishlist end */}
                </div>
                <hr className="solid" />
                <div className="product_return_policy">
                  <h3>RETURNS</h3>
                  <h6>
                    Easy 15 days return and exchange. Return Policies may vary
                    based on products and promotions. For full details on our
                    Returns Policies, please <a href="/">click here.</a>
                  </h6>
                </div>
                <hr className="solid" />
              </div>
            </div>
          );
          setProductDetail(responseData);
        }
      })
      .catch((error) => {
        console.log("Catch Block");
        console.log(error);
      });
  };

  return (
    <div>
      <Navbarr />
      {ProductDetail}
      {/* <div className="product_size_selection">
        <h5>Select Size:</h5>
        <div>
          <label>
            <input
              type="radio"
              value="6"
              checked={selectedSize === "6"}
              onChange={() => setSelectedSize("6")}
            />
            6
          </label>
          <label>
            <input
              type="radio"
              value="7"
              checked={selectedSize === "7"}
              onChange={() => setSelectedSize("7")}
            />
            7
          </label>
          <label>
            <input
              type="radio"
              value="8"
              checked={selectedSize === "8"}
              onChange={() => setSelectedSize("8")}
            />
            8
          </label>
          <label>
            <input
              type="radio"
              value="9"
              checked={selectedSize === "9"}
              onChange={() => setSelectedSize("9")}
            />
            9
          </label>
          <label>
            <input
              type="radio"
              value="10"
              checked={selectedSize === "10"}
              onChange={() => setSelectedSize("10")}
            />
            10
          </label>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default ProductPage;
