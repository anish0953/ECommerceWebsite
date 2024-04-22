import AddAddress from "../Address/AddAddress";
import CartPage from "../Cart/CartPage";
import Checkout from "../Checkout/Checkout";
import DashBoard from "../DashBoard/DashBoard";
import EditProfile from "../EditProfile/EditProfile";
import Login from "../Login/Login";
import NoPage from "../NoPage/NoPage";
import OrderConfirmed from "../OrderConfirmed/OrderConfirmed";
import OrderSummary from "../OrderSummary/OrderSummary";
import Orders from "../Orders/Orders";
import Payment from "../Payment/Payment";
import ProductPage from "../ProductPage/ProductPage";
import ProfileMenu from "../Profile/ProfileMenu";
import React from "react";
import Register from "./../Register/Register";
import Search from "./../Search/SearchPage";
import SubcategoryDisplay from "../SubcategoryPage/SubcategoryDisplay";
import TabsData from "../TabsPractice/TabsData";
import UpdateProfile from "../EditProfile/UpdateProfile";
import ViewAddress from "../Address/ViewAddress";
import Wishlist from "../Wishlist/Wishlist";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Starter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfileMenu />} />
          <Route path="/profile/editprofile" element={<EditProfile />} />
          <Route path="/profile/updateprofile" element={<UpdateProfile />} />
          <Route path="/profile/order" element={<Orders />} />
          <Route path="/profile/addresses" element={<ViewAddress />} />
          <Route path="/profile/addresses/add" element={<AddAddress />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orderconfirmed" element={<OrderConfirmed />} />
          <Route path="/tabsPractice" element={<TabsData />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
          <Route path="/product/:productID" element={<ProductPage />} />
          <Route
            path="/subcategory/:subcategoryID/:categoryName/:subcategoryName"
            element={<SubcategoryDisplay />}
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Starter;
