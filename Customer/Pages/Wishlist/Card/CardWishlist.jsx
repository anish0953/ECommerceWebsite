import "./CardWishlist.css";
import AddCardIcon from "@mui/icons-material/AddCard";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CardWishlist = ({ wishlistItemId }) => {
  const [productID, setproductID] = useState(null);
  const [productDetails, setProductDetails] = useState();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/Wishlist/findProductIdBywishlistItemId/${wishlistItemId}`
      )
      .then((response) => {
        if (response.status === 200) {
          setproductID(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [wishlistItemId]);

  const addItemToCart = () => {
    if (userId === null) {
      alert("Please Login to add item to cart");
    } else {
      let url = `http://localhost:8080/CartItem/addProductToCartbyUserIdandPID/${userId}/${productID}`;

      axios
        .post(url)
        .then((response) => {
          if (response.status === 200) {
            alert("Product Added successfully!");
            removeItemFromWishlist();
          }
        })
        .catch((error) => {
          alert("User Login Required");
          console.log(error);
        });
    }
  };
  const removeItemFromWishlist = () => {
    if (userId && wishlistItemId) {
      const url = `http://localhost:8080/Wishlist/removeItemFromWishlistbyUIDandWID/${userId}/${wishlistItemId}`;
      console.log(userId);
      console.log(wishlistItemId);
      axios
        .delete(url)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("WishlistItem");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("removing error");
    }
  };

  useEffect(() => {
    if (productID) {
      axios
        .get(`http://localhost:8080/Product/getProductById/${productID}`)
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data);
            const productData = response.data;
            const cardsbodydata = (
              <div className="wishlistcardsbody">
                <div className="card">
                  <div className="cardimgcontainer">
                    <img
                      className="wcimage"
                      src={productData.imageLink}
                      alt=""
                    />
                  </div>
                  <div className="flecboxc">
                    <div className="details">
                      <div className="tt">{productData.productName}</div>
                      <p style={{ fontSize: "12px", opacity: "50%" }}>
                        {productData.description}
                      </p>
                      <p>₹ {productData.price}</p>
                    </div>
                    <div className="functionalities">
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          addItemToCart();
                        }}
                      >
                        <AddCardIcon />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeItemFromWishlist();
                        }}
                      >
                        <DeleteSweepIcon />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
            setProductDetails(cardsbodydata);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);

  return <div>{productDetails}</div>;
};

export default CardWishlist;
