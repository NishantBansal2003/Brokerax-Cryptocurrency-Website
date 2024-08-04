import React, { useState, useRef, useEffect } from "react";
import NETS from "vanta/dist/vanta.net.min";
import logo from "../../../Images/Logo2.png";
import "../Style/LandingTheme.css";

const LandingTheme: React.FC = () => {
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const vantaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            setVantaEffect(
                NETS({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0xffffff,
                    backgroundColor: 0x1,
                    points: 11.0,
                    maxDistance: 0,
                    spacing: 18.0,
                })
            );
        }
        return () => {
            vantaEffect?.destroy();
        };
    }, [vantaEffect]);

    const [width, setWidth] = useState<number | boolean>(false);

    const updateWidth = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    console.log(width);

    return (
        <div className="main-outer flex flex-col" style={{ overflowX: "hidden" }}>
            <div
                className="rew pt-10 pb-10 main flex h-[100vh] w-[100%] justify-evenly items-center"
                ref={vantaRef}
            >
                <div className="main-heading text-white flex flex-col justify-center h-[50vh] ml-10">
                    <div className="h-60 mb-5 md:mb-0">
                        <img src={logo} alt="Logo" id="Logo-Header" className="w-50" />
                    </div>
                    <div className="s2 main-heading2 my-3 text-4xl">
                        Join the best Crypto Exchange in the world
                    </div>
                    <div className="s3 main-heading3 mt-2 text-2xl">
                        Brokerax is the easiest place to buy and sell Cryptocurrency.
                        <br />
                        Sign Up and get started today
                    </div>
                </div>
                <div className="video-outer flex items-center justify-center hexd w-[90vw]">
                    <video loop autoPlay muted playsInline className="h-[70%] w-[70%]">
                        <source type="video/mp4" src="https://i.imgur.com/erslMug.mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
};

export default LandingTheme;
