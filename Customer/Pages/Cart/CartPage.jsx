import CartBody from "./CartBody/CartBody";
import Footer from "../../Components/Footer/Footer";
import Navbarr from "../../Components/Navbar/Navbarr";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <Navbarr />
      <CartBody />
      <Footer />
    </div>
  );
};

export default CartPage;
