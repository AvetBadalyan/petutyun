import React from "react";
import "./Home.css";
import dog from "./../../assets/dog-medicine.webp";
import Navbar from "../Navbar/Navbar";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="home-container">
        <div className="home-image">
          <img src={dog} alt="dog" />
        </div>
        <div className="main-text">
          <div className="text-header">Pet medication made easy.</div>
          <div className="main-paragraph">
            Koala has all the medications and health products your pet needs. We
            package them by date and time to make pet care simpler. The best
            part? There are no service or shipping fees — you only pay for what
            your pet needs.
          </div>
          <div>
            <button className="shop-button">Shop for your pet →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
