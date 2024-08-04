import React from "react";
import Header from "../../Header/Code/header";
import Footer from "../../Footer/Code/Footer";
import Dashboard from "../Code/Dashboard"
function RenderDashboard() {
  return (
    <div>
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default RenderDashboard;
