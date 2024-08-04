import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "../Style/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt"></i>
                <div className="cta-text">
                  <h4>Find us</h4>
                  <span>IIT(BHU), VARANASI </span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-phone"></i>
                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>+91 12345 67891</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="far fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <span>brokerax@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-1">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <ul className="social_icon">
                    <li>
                      <a href="https://www.facebook.com">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.twitter.com">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="AboutUs">About Us</a>
                  </li>
                  <li>
                    <a href="Markets">Markets</a>
                  </li>
                  <li>
                    <a href="RenderingDash">Dashboard</a>
                  </li>
                  <li>
                    <a href="AboutUs">Our Team</a>
                  </li>
                  <li>
                    <a href="ContactUs">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-text">
        <p>
          Copyright &copy; {new Date().getFullYear()}, All Right Reserved
          <a href="/"> Brokerax</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
