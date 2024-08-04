import React, { useEffect } from "react";
import "../Style/Addon.css";
import i1 from "../../../Images/i1.png";
import i2 from "../../../Images/i2.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Addon: React.FC = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="aboutrem">
            <div
                className="about-content"
                data-aos="zoom-out"
                data-aos-anchor-placement="top-center"
                data-aos-delay="50"
                data-aos-easing="ease-in-out"
                data-aos-duration="1000"
            >
                <h1 style={{ textAlign: "center", fontSize: "300%" }}>
                    A trading partner you can trust
                </h1>
                <p style={{ textAlign: "center", fontSize: "150%" }}>
                    At Brokerax, we rigorously focus on quality and transparency. Our
                    order execution quality is independently monitored. Order execution
                    with high quality means: you save money with every investment you make
                    with Brokerax.
                </p>
            </div>
            <div className="batman-boxabout">
                <div
                    className="carderabout"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-center"
                    data-aos-delay="50"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="1000"
                >
                    <div className="card__imageabout">
                        <img src={i1} alt="Quality execution" />
                    </div>
                    <div className="card__copy">
                        <h1>Quality execution on every trade</h1>
                        <p>
                            Backed by multiple analyses and precise algorithms providing
                            quality execution decisions on every trade. Guarantee your comfort
                            and perfection in making decisions.
                        </p>
                    </div>
                </div>
                <div
                    className="carderabout"
                    data-aos="fade-down"
                    data-aos-anchor-placement="top-center"
                    data-aos-delay="50"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="1000"
                >
                    <div className="card__imageabout">
                        <img src={i2} alt="Transparent & competitive pricing" />
                    </div>
                    <div className="card__copyabout">
                        <h1>Transparent & competitive pricing</h1>
                        <p>
                            Provides transparency Pricing Emphasizes Value, not Price. As
                            price becomes clearer to everyone in the market, each competitor's
                            value also comes into sharper focus.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addon;
