import "./CardAddAddress.css";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardAddAddress = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("add");
      }}
      className="addcardadd"
    >
      <div className="borderofadd">
        <AddIcon fontSize="large" />
        Add Address
      </div>
    </div>
  );
};

export default CardAddAddress;
