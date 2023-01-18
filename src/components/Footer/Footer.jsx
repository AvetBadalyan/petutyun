import React from "react";
import "./Footer.css";
import fb from "./../../assets/faceb.png";
import insta from "./../../assets/insta.png";
import linkedin from "./../../assets/linkedin.png";
import twitter from "./../../assets/twitter.png";
import blueLogo from "./../../assets/logo.png";
import bear from "./../../assets/bear.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-contact">
          <div className="contact-info">
            <h6>Contact</h6>
            <p>hello@koala.health</p>
            <p>(866) 445-6252</p>
          </div>
          <div className="contact-address">
            <p> 179 South Street</p>
            <p>Suite 100</p>
            <p>
              Boston, <span style={{ fontSize: "14px" }}>MA</span>{" "}
              <span style={{ fontSize: "12px" }}>02111</span>
            </p>
          </div>
        </div>

        <div className="footer-company">
          <h6>Company</h6>
          <a href="#">How it works</a>
          <a href="#">Careers</a>
          <a href="#">FAQ</a>
        </div>

        <div className="footer-legal">
          <h6>Legal</h6>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Auto-Refill Terms of Use</a>
          <a href="#">Billing and Returns Policy</a>
          <a href="#">State Notices</a>
        </div>
      </div>

      <div className="footer-logos">
        <div className="social">
          <div className="social-links">
            <img src={insta} alt="insta" />
            <img src={fb} alt="fb" />
            <img src={twitter} alt="twitter" />
            <img src={linkedin} alt="linkedin" />
          </div>
        </div>
        <div className="blue-logo">
          <img src={blueLogo} alt="logo" />
        </div>
        <div className="bear">
          <img src={bear} alt="bear" />
        </div>
      </div>
      <span className="legal">Legal</span>
    </footer>
  );
}
