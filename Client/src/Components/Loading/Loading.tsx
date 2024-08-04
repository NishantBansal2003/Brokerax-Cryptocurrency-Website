import React from "react";
import logo from "../../Images/Loading.gif";
const Loading: React.FC = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <img src={logo} alt="Loading..." />
      <h3> Please refresh if taking long time...</h3>
    </div>
  );
};

export default Loading;
