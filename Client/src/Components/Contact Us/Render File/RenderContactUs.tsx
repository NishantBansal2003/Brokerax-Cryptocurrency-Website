import React from "react";
import Craousel from "../Code/Craousel";
import ContactPage from "../Code/ContactPage";
import Header from "../../Header/Code/header";
import Footer from "../../Footer/Code/Footer";
const RenderContactUs: React.FC = () => {
  return (
    <div>
      <Header />
      <Craousel />
      <ContactPage />
      <Footer />
    </div>
  );
};

export default RenderContactUs;
