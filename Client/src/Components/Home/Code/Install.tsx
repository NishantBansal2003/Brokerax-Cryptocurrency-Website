import React from "react";
import "../Style/Install.css";
import logo from "../../../Images/installImg.png";
const Install: React.FC = () => {
    return (
        <div className="installHome-section ">
            <div className="installHome-container">
                <div className="installHome-grid installHome-flex installHome-flex-center">
                    <div className="installHome-width-5-6@m installHome-inline">
                        <div className="installHome-grid" data-installHome-grid="">
                            <div className="installHome-position-top-left installHome-first-column">
                                <img
                                    src={logo}
                                    data-src="img/in-liquid-3-mockup.png"
                                    alt="sample-images"
                                    width="400vw"
                                    height="300vw"
                                    data-installHome-img=""
                                />
                            </div>
                            <div className="installHome-width-1-2@m installHome-first-column">
                                <span className="installHome-label ">
                                    Available on multiple platform
                                </span>
                                <h2 className="installHome-heading">
                                    World class platform
                                    <br />
                                    trade without a doubt.
                                </h2>
                                <p className="installHome-para">
                                    Run Our Website on Various Platforms Including
                                </p>
                                <div
                                    className="installHome-grid-small installHome-child-width-1-3 installHome-child-width-1-4@m installHome-margin-medium-top installHome-text-center installHome-grid"
                                    data-installHome-grid=""
                                >
                                    <div className="installHome-first-column">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="4vw"
                                            fill="currentColor"
                                            className="bi bi-apple"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                        </svg>
                                        <p className="installHome-text-small">MacOS</p>
                                    </div>
                                    <div className="installHome-first-column">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="4vw"
                                            fill="currentColor"
                                            className="bi bi-windows"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z" />
                                        </svg>
                                        <p className="installHome-text-small">Windows</p>
                                    </div>
                                    <div className="installHome-first-column">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="4vw"
                                            height="4vw"
                                            fill="currentColor"
                                            className="bi bi-google-play"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96 2.694-1.586Zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055l7.294-4.295ZM1 13.396V2.603L6.846 8 1 13.396ZM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27Z" />
                                        </svg>
                                        <p className="installHome-text-small">Android</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Install;
