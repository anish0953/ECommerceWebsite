import "./Navbarr.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* eslint-disable no-lone-blocks */

function Navbarr() {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userName) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, userName]);

  const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    let url = "http://localhost:8080/Category/getAllCategories";

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
          let responseData = response.data.map((category) => {
            return (
              <NavDropdown
                title={category.categoryName}
                id="navbarScrollingDropdown"
                className="navbar-navlinks"
                key={category.categoryId}
              >
                {category.subcategories.map((subcategory) => {
                  return (
                    <NavDropdown.Item
                      href={`/subcategory/${subcategory.subcategoryId}/${category.categoryName}/${subcategory.subcategoryName}`}
                      key={subcategory.subcategoryId}
                    >
                      {subcategory.subcategoryName}
                      <NavDropdown.Divider />
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            );
          });
          setCategoryList(responseData);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Catch Block");
      });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary myNavbar">
      <Container fluid>
        <Navbar.Brand href="/dashboard" id="brandname">
          AJIO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 my-lg-0 navcatlist"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {CategoryList}
          </Nav>

          <Link to="/search">
            <i className="fa-solid fa-magnifying-glass icons"></i>
          </Link>
          {isLoggedIn ? (
            <div className="navbar-icons navicclog">
              <Link to="/wishlist">
                <i className="fa-regular fa-heart icons mx-4"></i>
              </Link>
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping icons"></i>
              </Link>
              <Nav>
                <NavDropdown
                  title={<i className="fa-regular fa-user icons"></i>}
                  id="navbarScrollingDropdown"
                  className="navbar-navlinks"
                >
                  <NavDropdown.Item href="/profile">
                    {userName.toUpperCase()}'s PROFILE
                    <NavDropdown.Divider />
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    href=""
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    LOG OUT
                    <NavDropdown.Divider />
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          ) : (
            <button
              className="btn btn-dark border border-0"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              LOG IN
            </button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
