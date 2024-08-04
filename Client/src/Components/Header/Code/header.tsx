import React from "react";
import "../Style/header.css";
import logo from "..//..//../Images/Logo2.png";
let isLoggedIn = window.localStorage.getItem("token");
function handleOp() {
  if (isLoggedIn !== null) {
    window.localStorage.removeItem("token");
    isLoggedIn = null;
  }
}
const Header: React.FC = () => {
  return (
    <header className="header-fixed">
      <div className="header-limiter">
        <img src={logo} alt="Logo" id="Logo-Header" />

        <nav id="header-nav">
          <a href="/" id="dlt-sm">
            Home
          </a>
          <a href="Markets" id="nodlt-sm">
            Market
          </a>
          <a href="userDetails" id="nodlt-sm">
            Dashboard
          </a>
          <a href="ContactUs" id="dlt-sm">
            Contact Us
          </a>
        </nav>
        <button id="header-button">
          <a href="signup" onClick={handleOp}>
            {isLoggedIn !== null ? "Log Out" : "Log In/Sign Up"}
          </a>
        </button>
      </div>
    </header>
  );
};
export default Header;
