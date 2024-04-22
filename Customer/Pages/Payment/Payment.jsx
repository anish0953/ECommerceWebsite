import Checkbox from "@mui/material/Checkbox";
import Footer from "../../Components/Footer/Footer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Navbarr from "../../Components/Navbar/Navbarr";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    saveCard: false,
  });

  const [formValid, setFormValid] = useState(false);

  const isFormValid = () => {
    const isCheckboxValid = true;
    const isOtherFieldsValid = Object.entries(formData).every(
      ([key, value]) => key === "saveCard" || (value && value.trim() !== "")
    );

    return isCheckboxValid && isOtherFieldsValid;
  };

  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData({
      ...formData,
      [name]: name === "saveCard" ? checked : value,
    });
    setFormValid(isFormValid());
  };

  const handleSubmit = () => {
    if (formValid) {
      localStorage.setItem("cardName", formData.cardName);
      localStorage.setItem("CardNumber", formData.cardNumber);
      localStorage.setItem("cardExp", formData.expDate);
      navigate("/ordersummary");
    } else {
      console.error("Invalid form. Please fill in all the required fields.");
    }
  };

  return (
    <div>
      <Navbarr />
      <div className="paymentcontainer m-5">
        <div className="paymentdetailbox m-3">
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardName"
                  name="cardName"
                  label="Name on card"
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                  value={formData.cardName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  name="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
                  variant="standard"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  name="expDate"
                  focused
                  label="Expiry date"
                  type="date"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="standard"
                  value={formData.expDate}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="standard"
                  value={formData.cvv}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveCard"
                      checked={formData.saveCard}
                      onChange={handleInputChange}
                    />
                  }
                  label="Remember credit card details for next time"
                />
              </Grid>
            </Grid>
          </React.Fragment>
        </div>
        <div className="summarybtn">
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={handleSubmit}
            disabled={!formValid}
          >
            Order Summary
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
