import React from "react";
import logo from "../../assets/images/ajvamotor.png"
import "../../assets/css/Header.css"
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-logo">
          <img src={logo} alt="ajvamotor-logo" />
        </div>
        <div className="header-navbar">
          <nav className="nav">
            <ul className="nav-list">
              <NavLink to="/">
              <li>Home</li>

              </NavLink>
              <li>About</li>
              <NavLink to="/tractor-part">

             
              <li>Tractor Parts</li>
              </NavLink>



              <NavLink to="/truck-part">

              <li>Truck Parts</li>
              </NavLink>
              <li>Truck Parts</li>
              <li>PDF Catalogue</li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
