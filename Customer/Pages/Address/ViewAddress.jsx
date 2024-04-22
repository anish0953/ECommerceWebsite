import "./ViewAddress.css";
import CardAddAddress from "./CardAddAddress";
import CardAddress from "./CardAddress";
import Footer from "../../Components/Footer/Footer";
import Navbarr from "../../Components/Navbar/Navbarr";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAddress = () => {
  const userID = localStorage.getItem("userId");

  const [UserAddressData, setUserAddressData] = useState([]);

  const handleUpdateAddressCard = (deletedItemId) => {
    setUserAddressData((prevCartAddressData) =>
      prevCartAddressData.filter(
        (address) => address.address_id !== deletedItemId
      )
    );
    window.location.reload();
  };

  useEffect(() => {
    if (userID !== null) {
      let url = `http://localhost:8080/Address/getAllAddressByUserId/${userID}`;

      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            let UserLayout = response.data.map((address) => {
              return (
                <div key={address.address_id}>
                  <CardAddress
                    address={address}
                    userID={userID}
                    handleUpdateAddressCard={handleUpdateAddressCard}
                  />
                </div>
              );
            });
            setUserAddressData(UserLayout);
          }
        })
        .catch((error) => {
          alert("Server Error , try again later");
          console.log(error);
        });
    }
  }, [userID]);

  return (
    <div>
      <Navbarr />
      <div className="addContainer">
        <div className="addtitle">Your Addresses</div>
        <div className="addcardsbox">
          <CardAddAddress />

          {UserAddressData}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAddress;
