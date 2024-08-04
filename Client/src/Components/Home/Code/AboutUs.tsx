import React from "react";
import Spline from "@splinetool/react-spline";
const AboutUs: React.FC = () => {
    return (
        <>
            <div className="h-[35rem] flex justify-content " id="about">
                <Spline scene="https://prod.spline.design/JrhpkweTMJGhzLgr/scene.splinecode" />
            </div>
            <section className="bg-black text-black ">
                <div className="container flex flex-col justify-center align-center p-6 mx-auto sm:py-12 lg:py-8 lg:flex-row lg:justify-between">
                    <p className="text-2xl font-semibold  leading-relaxed text-[#fc5b3f]">
                        At Brokerax, we're passionate about helping investors build better
                        portfolios. We believe that investing should be simple and
                        accessible to everyone. That's why we've created a platform that
                        offers powerful tools, real-time data, and expert insights to help
                        you invest smarter. Whether you're a novice or a seasoned investor,
                        Brokerax is the platform for you.
                    </p>
                </div>
            </section>
        </>
    );
}
export default AboutUs;