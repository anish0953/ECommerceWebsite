import "./OrderConfirmed.css";
import Footer from "../../Components/Footer/Footer";
import Navbarr from "../../Components/Navbar/Navbarr";
import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";

const OrderConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbarr />
      <div
        className="opop"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <h3 style={{ color: "blue" }}>
          <VerifiedIcon style={{ fontSize: "50px", marginBottom: "20px" }} />
        </h3>
        <h1>Order Placed</h1>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmed;
