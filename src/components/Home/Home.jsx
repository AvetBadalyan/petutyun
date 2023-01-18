import React from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="home-container">Home</div>
    </div>
  );
}
