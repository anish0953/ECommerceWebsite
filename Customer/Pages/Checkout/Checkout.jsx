import "./Checkout.css";
import Footer from "../../Components/Footer/Footer";
import Navbarr from "../../Components/Navbar/Navbarr";
import Radio from "@mui/material/Radio";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const userID = localStorage.getItem("userId");
  const [userSelectedAddress, setUserSelectedAddress] = useState(null);
  const [userAddressData, setUserAddressData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userSelectedAddress);
  }, [userSelectedAddress]);

  useEffect(() => {
    if (userID !== null) {
      let url = `http://localhost:8080/Address/getAllAddressByUserId/${userID}`;

      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            setUserAddressData(response.data);
          }
        })
        .catch((error) => {
          alert("Server Error, try again later");
          console.log(error);
        });
    }
  }, [userID]);

  const handleAddressSelection = (addressId) => {
    setUserSelectedAddress(addressId);
    localStorage.setItem("addressid", addressId);
  };

  const proceedToPayment = () => {
    if (userSelectedAddress !== null) {
      navigate("/payment");
    } else {
      alert("Please select an address before proceeding to payment.");
    }
  };

  return (
    <div>
      <Navbarr />
      <div className="checkoutcontainer">
        <h3 className="m-4"> Select Address</h3>
        <div className="selectioncontainer m-4">
          {userAddressData.map((address) => (
            <div key={address.address_id} className="addcard">
              <div className="cardfunc">
                <Radio
                  defaultValue={address.address_id}
                  checked={userSelectedAddress === address.address_id}
                  onChange={() => handleAddressSelection(address.address_id)}
                />
              </div>
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
                <p>
                  Phone Number: <span>{address.contact}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="paymentbnt">
          <button
            className="btn btn-primary mb-5 mx-5"
            onClick={proceedToPayment}
            disabled={userSelectedAddress === null}
          >
            Proceed To Payment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
