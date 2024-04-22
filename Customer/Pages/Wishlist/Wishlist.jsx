import "./Wishlist.css";
import CardWishlist from "./Card/CardWishlist";
import Footer from "../../Components/Footer/Footer";
import Navbarr from "../../Components/Navbar/Navbarr";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlistData, setwishlistData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId !== null) {
      axios
        .get(`http://localhost:8080/Wishlist/getProductListByUserID/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data);
            setwishlistData(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  return (
    <div>
      <Navbarr />
      <div className="wishlistbody">
        <div className="wishlist-title">My WishList</div>
        <div className="wishlist-tiles">
          {wishlistData.map((item) => (
            <CardWishlist
              key={item.wishlistItemId}
              wishlistItemId={item.wishlistItemId}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
