import "./CardProfileMenu.css";
import React from "react";
import { Link } from "react-router-dom";

const CardProfileMenu = ({ imagelink, title, body, path }) => {
  return (
    <div className="profilemenucard">
      <Link to={path}>
        <div className="menucard">
          <div className="menuimage">
            <img src={imagelink} alt="" className="menucardimg" />
          </div>
          <div className="menudetail">
            <h6>{title}</h6>
            <p>{body}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProfileMenu;
