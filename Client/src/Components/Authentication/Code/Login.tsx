import React, { useState } from "react";
import "../Style/Login.css";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { toast } from "react-toastify";
// import "./login.css";
import BASE_URL from "../../../Services/Service";
function Model(props: any) {
  const { scene } = useGLTF("/ethereum/scene.gltf");

  // Add a rotation animation to the model using useFrame hook
  useFrame(({ clock }) => {
    scene.rotation.y = Math.sin(clock.getElapsedTime() * 1) * 0.3;
  });

  return <primitive object={scene} {...props} />;
}
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log(email, password);
    fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({
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
        data = data.data;
        localStorage.setItem("token", data.token);
        window.localStorage.setItem("userId", JSON.stringify(data.userId));
        window.localStorage.setItem("email", data.email);
        window.localStorage.setItem("first_name", data.first_name);
        window.localStorage.setItem("last_name", data.last_name);
        toast.success("Login Successfull");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);

        // Handle data
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Something Went Wrong");
      });
  }

  return (
    <div className="Login_PAGE flex flex-row bg-[#2f2f2f] h-[100vh]">
      <div className="a3d-model w-[60vw] ">
        <Canvas
          dpr={[1, 2]}
          style={{
            position: "relative",
            backgroundColor: "black",
            height: "100vh",
          }}
        >
          <pointLight position={[3, 0, 10]} intensity={200} />
          <PresentationControls
            speed={1.5}
            global
            zoom={0.2}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={null}>
              <Model scale={0.005} />
            </Stage>
          </PresentationControls>
        </Canvas>
      </div>
      <div className="form-container w-[50%] flex flex-col justify-center">
        <div className="form-body w-[80%] md:w-[80%] lg:w-[60%] md:m-auto m-[5%]">
          <div className="form-header">
            <h1 className="text-5xl p-5 font-bold text-white">Sign In</h1>
          </div>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-input">
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                className="email m-2"
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
                className="password m-2"
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
                Login
              </button>
            </div>
          </form>

          <div style={{ textAlign: "center", color: "white" }}>
            Dont have an account?
            <a href="/signup">
              <strong style={{ color: "#fc5b3f" }}> Sign up</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
