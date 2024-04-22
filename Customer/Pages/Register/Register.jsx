import "./Register.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [checkBox, setCheckBox] = React.useState(false);

  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userPassword: "",
    cpassword: "",
  });

  const [errors, setErrors] = React.useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userPassword: "",
    cpassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      handleRegister();
    } else {
      console.log("Form is not valid. Please correct the errors.");
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!userData.userName) {
      newErrors.userName = "Username is required";
      valid = false;
    }

    if (!userData.userEmail) {
      newErrors.userEmail = "Email is required";
      valid = false;
    } else if (!isValidEmail(userData.userEmail)) {
      newErrors.userEmail = "Invalid email format";
      valid = false;
    }

    if (!userData.userPhone) {
      newErrors.userPhone = "Phone number is required";
      valid = false;
    } else if (!isValidPhoneNumber(userData.userPhone)) {
      newErrors.userPhone = "Invalid phone number format";
      valid = false;
    }

    if (!userData.userPassword) {
      newErrors.userPassword = "Password is required";
      valid = false;
    } else if (!isValidPassword(userData.userPassword)) {
      newErrors.userPassword =
        "Password should have at least 1 capital letter, 1 number, 1 special character, 1 small letter, and be minimum 8 characters long";
      valid = false;
    }

    if (!userData.cpassword) {
      newErrors.cpassword = "Confirm password is required";
      valid = false;
    } else if (userData.userPassword !== userData.cpassword) {
      newErrors.cpassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email) => {
    const emailRegex =
      /[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (number) => {
    const numberRegex = /^[6-9]\d{9}$/;
    return numberRegex.test(number);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = () => {
    const userDataToInsert = {
      userName: userData.userName,
      userEmail: userData.userEmail,
      userPhone: userData.userPhone,
      userPassword: userData.userPassword,
    };

    const url = "http://localhost:8080/User/registerUser";

    axios
      .post(url, userDataToInsert)
      .then((response) => {
        if (response.status === 200) {
          alert("Registration successful!");
          navigate("login");
        }
      })
      .catch((error) => {
        console.log("Catch block ->");
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // alert(error.response.data.message);
          setErrors((prevErrors) => ({
            ...prevErrors,
            userEmail: error.response.data.message,
          }));
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="border p-4 shadow-box"
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="userName"
                fullWidth
                id="userName"
                label="User Name *"
                autoFocus
                value={userData.userName}
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
                error={Boolean(errors.userName)}
                helperText={errors.userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="userEmail"
                label="Email Address "
                name="userEmail"
                autoComplete="email"
                value={userData.userEmail}
                onChange={(e) =>
                  setUserData({ ...userData, userEmail: e.target.value })
                }
                error={Boolean(errors.userEmail)}
                helperText={errors.userEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="userPhone"
                label="Phone Number *"
                name="userPhone"
                autoComplete="number"
                value={userData.userPhone}
                onChange={(e) =>
                  setUserData({ ...userData, userPhone: e.target.value })
                }
                error={Boolean(errors.userPhone)}
                helperText={errors.userPhone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="userPassword"
                label="Password *"
                type="password"
                id="userPassword"
                value={userData.userPassword}
                onChange={(e) =>
                  setUserData({ ...userData, userPassword: e.target.value })
                }
                error={Boolean(errors.userPassword)}
                helperText={errors.userPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="cpassword"
                label="Confirm Password *"
                type="password"
                id="cpassword"
                value={userData.cpassword}
                onChange={(e) =>
                  setUserData({ ...userData, cpassword: e.target.value })
                }
                error={Boolean(errors.cpassword)}
                helperText={errors.cpassword}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-start">
              <FormControlLabel
                control={
                  <Checkbox
                    value={checkBox}
                    name="confirm-terms"
                    onChange={(e) => {
                      setCheckBox(e.target.checked);
                    }}
                    color="primary"
                  />
                }
                label="I Agree to All the Terms and Conditions."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!checkBox}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ marginTop: "2rem" }}
          >
            {"Copyright © "}
            <Link color="inherit" href="https://AJIO.com/">
              AJIO
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
