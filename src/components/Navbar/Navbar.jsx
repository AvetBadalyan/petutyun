import React from "react";
import "./Navbar.css";
import hamburger from "./../../assets/Vector.png";
import koala from "./../../assets/koala.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-and-menu">
        <div className="burger-menu">
          <img src={hamburger} alt="hamburger" />
        </div>
        <div className="logo">
          <img src={koala} alt="koala" />
        </div>
      </div>
      <div className="search-field">
        <input type="text" placeholder="Search for products" />
      </div>
      <div className="login">
        <a href="#">How It Works</a>
        <a href="#">Sign in</a>
        <button className="count-button">0</button>
      </div>
    </nav>
  );
}
