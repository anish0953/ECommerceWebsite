import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const ProfileSideBar = () => {
  return (
    <div>
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem
            component={<Link to="/profile" />}
            style={{ fontWeight: "bold", fontSize: "20px" }}
          >
            My Account
          </MenuItem>
          <MenuItem component={<Link to="editprofile" />}>
            Edit Profile
          </MenuItem>
          <MenuItem component={<Link to="/documentation" />}>Address</MenuItem>
          <MenuItem component={<Link to="/Orders" />}>Orders</MenuItem>
          <MenuItem component={<Link to="/Credits" />}>Credits</MenuItem>
          <MenuItem component={<Link to="/documentation" />}>Payment</MenuItem>
          <MenuItem component={<Link to="/documentation" />}>
            Customer Support
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default ProfileSideBar;
