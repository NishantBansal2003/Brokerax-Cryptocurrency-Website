import React, { useState } from "react";
import "../Style/SignUp.css";
import { toast } from "react-toastify";
import BASE_URL from "../../../Services/Service";
import Spline from "@splinetool/react-spline";

const SignupForm: React.FC = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(fname, lname, email, password);
    fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        first_name: fname,
        last_name: lname,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          data = data.data;
          localStorage.setItem("token", data.token);
          window.localStorage.setItem("userId", JSON.stringify(data.userId));
          window.localStorage.setItem("email", data.email);
          window.localStorage.setItem("first_name", data.first_name);
          window.localStorage.setItem("last_name", data.last_name);
          toast.success("Signup Successfull");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else {
          toast.error(data.data.message);
          console.log(data.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast(err.message);
        setTimeout(() => {
          window.location.href = "/signup";
        }, 2000);
      });
  };
  return (
    <div className="Login_PAGE flex flex-row bg-[#2f2f2f] h-[100vh]">
      <div className="a3d-model w-[60vw] flex justify-center items-center bg-black">
        {/* rotate the 3d model */}
        <div className="flex items-center justify-center h-[40rem] w-[50rem]">
          <Spline scene="https://prod.spline.design/aj-hTvEK81rVZrpk/scene.splinecode" />
        </div>
      </div>

      <div className="form-container w-[50%] flex flex-col justify-center">
        <div className="form-body w-[80%] md:w-[80%] lg:w-[60%] md:m-auto m-[5%]">
          <div className="form-header">
            <h1 className="text-5xl p-5 font-bold text-white">Sign Up</h1>
          </div>

          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-input">
              <input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
                name="first_name"
                className="firstname m-2 "
                required
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#454343",
                }}
              />
              <input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
                name="last_name"
                className="lastname m-2 "
                required
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#454343",
                }}
              />
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                className="email m-2 "
                required
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#454343",
                }}
              />

              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                className="password m-2 "
                required
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#454343",
                }}
              />
            </div>
            <div className="form-button">
              <button
                type="submit"
                className="login-button m-2"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#fc5b3f",
                }}
              >
                Sign up
              </button>
            </div>
          </form>
          <div style={{ textAlign: "center", color: "white" }}>
            Already have an account?
            <a href="/signin">
              <strong style={{ color: "#fc5b3f" }}> Login here</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
