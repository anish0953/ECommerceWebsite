import "./AddAddress.css";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import Footer from "../../Components/Footer/Footer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Navbarr from "../../Components/Navbar/Navbarr";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const userID = localStorage.getItem("userId");

  const [AddressData, setAddressData] = React.useState({
    addressname: "",
    address: "",
    landmark: "",
    contact: "",
    pincode: null,
    city: "",
    country: "",
    state: "",
    personname: "",
  });
  // const [errors, setErrors] = React.useState({
  //   addressname: "",
  //   address: "",
  //   landmark: "",
  //   contact: "",
  //   pincode: "",
  //   city: "",
  //   country: "",
  //   state: "",
  //   personname: "",
  // });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    handleRegister();
  };

  const handleRegister = () => {
    const userDataToInsert = {
      addressname: AddressData.addressname,
      address: AddressData.address,
      landmark: AddressData.landmark,
      contact: AddressData.contact,
      pincode: AddressData.pincode,
      city: AddressData.city,
      country: AddressData.country,
      state: AddressData.state,
      personname: AddressData.personname,
    };

    const url = `http://localhost:8080/Address/addAddressToUserIDandAddress/${userID}`;

    axios
      .post(url, userDataToInsert)
      .then((response) => {
        if (response.status === 200) {
          alert("Address added successful!");
          navigate("/profile/addresses");
        }
      })
      .catch((error) => {
        console.log("Catch block ->");
        console.log(error);
      });
  };

  return (
    <div>
      <Navbarr />
      <div className="conatineraddaddress">
        <React.Fragment>
          <Typography variant="h5" className="text-center py-3" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="userName"
                name="userName"
                label="User name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) =>
                  setAddressData({ ...AddressData, personname: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="userConatact"
                name="userConatact"
                label="Contact Number"
                fullWidth
                autoComplete="Mobile-number"
                variant="standard"
                onChange={(e) =>
                  setAddressData({ ...AddressData, contact: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="addressname"
                name="addressname"
                label="Address Name"
                fullWidth
                autoComplete="addressname"
                variant="standard"
                onChange={(e) =>
                  setAddressData({
                    ...AddressData,
                    addressname: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address line"
                fullWidth
                autoComplete="shipping address-line"
                variant="standard"
                onChange={(e) =>
                  setAddressData({ ...AddressData, address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="landmark"
                name="landmark"
                label="Landmark"
                fullWidth
                autoComplete="Landmark"
                variant="standard"
                onChange={(e) =>
                  setAddressData({ ...AddressData, landmark: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                onChange={(e) =>
                  setAddressData({ ...AddressData, city: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setAddressData({ ...AddressData, state: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
                onChange={(e) =>
                  setAddressData({ ...AddressData, pincode: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                onChange={(e) =>
                  setAddressData({ ...AddressData, country: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label="Use this address for payment details"
              />
            </Grid>
            <Grid item xs={12}>
              <button type="submit" className="btn btn-dark btnaddfunc">
                Add Address
              </button>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
      <Footer />
    </div>
  );
};

export default AddAddress;
