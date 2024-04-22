import "./EditProfile.css";
import Footer from "../../Components/Footer/Footer";
import Navbarr from "../../Components/Navbar/Navbarr";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [profileData, setprofileData] = useState();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (userEmail !== null) {
      let url = `http://localhost:8080/Profile/findUser/${userEmail}`;

      axios
        .get(url, {
          header: {
            "Content-type": "application/json",
            "Access-Control-Allow-Headers": "Content-type",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const profileBody = (
              <div className="epcontainer">
                <div className="eptitle">View And Edit Profile</div>
                <div className="epbody">
                  <div className="editcard">
                    <div className="flexb1">
                      <h6 className="titleec">User Name</h6>
                      <div className="nameec">{response.data.userName}</div>
                    </div>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        navigate("/profile/updateprofile");
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="editcard">
                    <div className="flexb1">
                      <h6 className="titleec">Email</h6>
                      <div className="nameec">{response.data.userEmail}</div>
                    </div>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        navigate("/profile/updateprofile");
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="editcard">
                    <div className="flexb1">
                      <h6 className="titleec">Primary Phone Number</h6>
                      <div className="nameec">{response.data.userPhone}</div>
                    </div>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        navigate("/profile/updateprofile");
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="editcard">
                    <div className="flexb1">
                      <h6 className="titleec">Password</h6>
                      <div className="nameec">***********</div>
                    </div>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        navigate("/profile/updateprofile");
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
            setprofileData(profileBody);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Catch Block");
        });
    }
  }, [navigate, userEmail]);

  return (
    <div>
      <Navbarr />
      {<div>{profileData}</div>}
      <Footer />
    </div>
  );
};

export default EditProfile;
