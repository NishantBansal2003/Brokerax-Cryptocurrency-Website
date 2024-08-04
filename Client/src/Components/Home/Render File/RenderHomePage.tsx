import React from "react";
import LandingTheme from "../Code/LandingTheme";
import Header from "../../Header/Code/header";
import Addon from "../Code/Addon";
import AboutUs from "../Code/AboutUs";
import Steps from "../Code/Steps";
import Install from "../Code/Install";
import Last from "../Code/Last";
import Footer from "../../Footer/Code/Footer";
const RenderHomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <LandingTheme />
      <Addon />
      <AboutUs />
      <Steps />
      <Install />
      <Last />
      <Footer />
    </div>
  );
};

export default RenderHomePage;
