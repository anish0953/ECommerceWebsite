import "./ProfileMenu.css";
import CardProfileMenu from "./CardProfileMenu";
import Footer from "../../Components/Footer/Footer";
import Navbarr from "../../Components/Navbar/Navbarr";
import React from "react";

const ProfileMenu = () => {
  return (
    <>
      <Navbarr />
      <div className="menubody">
        <h2>Profile Menu</h2>
        <div className="cardbody">
          <CardProfileMenu
            imagelink="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"
            title="Profile "
            body="Edit and view profile , phone number"
            path="editprofile"
          />

          <CardProfileMenu
            imagelink="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"
            title="Your Addresses"
            body="Edit addresses for orders and gifts"
            path="addresses"
          />
          <CardProfileMenu
            imagelink="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
            title="Your Orders"
            body="Track , return or buy things again"
            path="order"
          />
          <CardProfileMenu
            imagelink="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/amazon_pay._CB485946857_.png"
            title="Ajio Coins"
            body="Add coins and money to your ajio wallet"
            path="ajiocoins"
          />
          <CardProfileMenu
            imagelink="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Payments._CB485926359_.png"
            title="Payment Options"
            body="Edit or add payment methods for orders"
            path="payment"
          />

          <CardProfileMenu
            imagelink="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png"
            title="Contact us"
            body="Need help ? Contact our support team"
            path="support"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileMenu;
