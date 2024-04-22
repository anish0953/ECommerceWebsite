import "./OrderSummary.css";
import * as React from "react";
import CardProduct from "./CardProduct";
import Footer from "../../Components/Footer/Footer";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Navbarr from "../../Components/Navbar/Navbarr";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const userId = localStorage.getItem("userId");
  const cardName = localStorage.getItem("cardName");
  const CardNumber = localStorage.getItem("CardNumber");
  const cardExp = localStorage.getItem("cardExp");
  const addressid = localStorage.getItem("addressid");
  const cartTotal = localStorage.getItem("cartTotal");

  const [selectedAddressData, setselectedAddressData] = React.useState({});

  const [cartDetails, setcartDetails] = React.useState([]);

  const placeOrder = () => {
    const url = `http://localhost:8080/Order/placeOrderByCartwithUIDandAID/${userId}/${addressid}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        console.log("Order is placed");
      })
      .catch((error) => {
        console.log("Order is placed with e");
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (userId !== null) {
      axios
        .get(`http://localhost:8080/CartItem/getProductListByUserID/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            setcartDetails(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  React.useEffect(() => {
    const url = `http://localhost:8080/Address/FindAddressByAIDandUID/${addressid}/${userId}`;

    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setselectedAddressData(response.data);
        }
      })
      .catch((error) => {
        alert("Server Error , try again later");
        console.log(error);
      });
  }, [addressid, userId]);

  const handleClearCart = () => {
    const url = `http://localhost:8080/CartItem/clearCart/${userId}`;

    axios
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          // alert("Cart Deleted ");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigate = useNavigate();

  const addresses = [
    selectedAddressData.address,
    selectedAddressData.landmark,
    selectedAddressData.city,
    selectedAddressData.pincode,
    selectedAddressData.state,
  ];
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: cardName },
    {
      name: "Card number",
      detail: "xxxx-xxxx-xxxx-" + CardNumber.slice(-5, -1),
    },
    { name: "Expiry date", detail: cardExp },
  ];
  return (
    <div>
      <Navbarr />
      <div className="summarybox">
        {" "}
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {cartDetails.map((product) => (
              <div key={product.cartItemId}>
                <CardProduct cartItemId={product.cartItemId} />
              </div>
            ))}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Delivery" />
              <Typography variant="subtitle1">₹ 40</Typography>
            </ListItem>{" "}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Tax" />
              <Typography variant="subtitle1">
                ₹{(cartTotal * 0.05).toFixed(2)}
              </Typography>
            </ListItem>{" "}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Discount" />
              <Typography variant="subtitle1">
                - ₹{(cartTotal * 0.1).toFixed(2)}
              </Typography>
            </ListItem>{" "}
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ₹{cartTotal}
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping
              </Typography>
              <Typography gutterBottom>
                {" "}
                {selectedAddressData.personname}
              </Typography>
              <Typography gutterBottom>
                {" "}
                {selectedAddressData.contact}
              </Typography>
              <Typography gutterBottom>{addresses.join(", ")}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payment details
              </Typography>
              <Grid container>
                {payments.map((payment) => (
                  <React.Fragment key={payment.name}>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.detail}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
        <div className="orderplacedbtn">
          <button
            className="btn btn-dark my-4"
            onClick={() => {
              placeOrder();
              handleClearCart();
              navigate("/orderconfirmed");
            }}
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSummary;
