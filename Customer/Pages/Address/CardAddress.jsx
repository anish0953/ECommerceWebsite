import "./CardAddress.css";
import React from "react";
import axios from "axios";

const CardAddress = ({ address, userID, handleUpdateAddressCard }) => {
  const deleteAddress = () => {
    const url = `http://localhost:8080/Address/deleteAddressByAIDandUID/${address.address_id}/${userID}`;
    axios
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          alert("Address Deleted -> " + address.addressname);
          handleUpdateAddressCard(address.address_id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="addcard">
      <div className="carddetails">
        <h6>{address.addressname}</h6>
        <p>{address.personname}</p>
        <p>{address.address}</p>
        <p>{address.landmark}</p>
        <p>
          {address.city} , {address.state}
        </p>
        <p>
          {address.country} , {address.pincode}
        </p>
        <p></p>
        <p>
          Phone Number: <span>{address.contact}</span>
        </p>
      </div>
      <div className="cardfunc">
        {/* <button className="btn btn-dark px-4  btn-sm">Edit</button> */}
        <button
          className="btn btn-sm btn-danger px-3"
          onClick={() => {
            deleteAddress();
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CardAddress;
