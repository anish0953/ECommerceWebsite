import "./UpdateProfile.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../Components/Footer/Footer";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Navbarr from "../../Components/Navbar/Navbarr";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");
  const [newUserData, setNewUserData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userPassword: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = React.useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userPassword: "",
    cpassword: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!newUserData.userName) {
      newErrors.userName = "Username is required";
      valid = false;
    }

    if (!newUserData.userEmail) {
      newErrors.userEmail = "Email is required";
      valid = false;
    } else if (!isValidEmail(newUserData.userEmail)) {
      newErrors.userEmail = "Invalid email format";
      valid = false;
    }

    if (!newUserData.userPhone) {
      newErrors.userPhone = "Phone number is required";
      valid = false;
    } else if (!isValidPhoneNumber(newUserData.userPhone)) {
      newErrors.userPhone = "Invalid phone number format";
      valid = false;
    }

    if (!newUserData.userPassword) {
      newErrors.userPassword = "Password is required";
      valid = false;
    } else if (!isValidPassword(newUserData.userPassword)) {
      newErrors.userPassword =
        "Password should have at least 1 capital letter, 1 number, 1 special character, 1 small letter, and be minimum 8 characters long";
      valid = false;
    }

    if (!newUserData.cpassword) {
      newErrors.cpassword = "Confirm password is required";
      valid = false;
    } else if (newUserData.userPassword !== newUserData.cpassword) {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      handleUpdateProfile();
    } else {
      console.log("Form is not valid. Please correct the errors.");
    }
  };

  React.useEffect(() => {
    if (userEmail) {
      let url = `http://localhost:8080/Profile/findUser/${userEmail}`;

      axios
        .get(url, {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Headers": "Content-type",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setNewUserData((prevUserData) => ({
              ...prevUserData,
              userName: response.data.userName,
              userEmail: response.data.userEmail,
              userPhone: response.data.userPhone,
            }));
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Catch Block");
        });
    }
  }, [userEmail]);

  const handleUpdateProfile = () => {
    // e.preventDefault();
    const userDataToInsert = {
      userid: Number(userId),
      userName: newUserData.userName,
      userEmail: newUserData.userEmail,
      userPassword: newUserData.userPassword,
      userPhone: newUserData.userPhone,
    };
    // console.log(userDataToInsert);

    let url = "http://localhost:8080/Profile/updateProfile/";

    axios
      .put(url, userDataToInsert, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Headers": "Content-type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Profile updated successfully");
          localStorage.setItem("userId", userId);
          localStorage.setItem("userName", newUserData.userName);
          localStorage.setItem("userPhone", newUserData.userPhone);
          localStorage.setItem("userEmail", newUserData.userEmail);
          navigate("/profile/editprofile");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbarr />
      <div className="editform">
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
                    value={newUserData.userName}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        userName: e.target.value,
                      })
                    }
                    error={Boolean(errors.userName)}
                    helperText={errors.userName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="userEmail"
                    name="userEmail"
                    autoComplete="email"
                    value={newUserData.userEmail}
                    disabled
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
                    value={newUserData.userPhone}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        userPhone: e.target.value,
                      })
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
                    value={newUserData.userPassword}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        userPassword: e.target.value,
                      })
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
                    value={newUserData.cpassword}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        cpassword: e.target.value,
                      })
                    }
                    error={Boolean(errors.cpassword)}
                    helperText={errors.cpassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // disabled={!checkBox}
              >
                UPDATE PROFILE
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
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
