import React from "react";
import "../Style/ContactPage.css";
const ContactPage: React.FC = () => {
  return (
    <div className="ConatctForm">
      <section className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <h3>Contact Us</h3>
                        <p>
                          Feel Free to contact us any time. We will get back to
                          you as soon as we can!.
                        </p>
                        <input
                          type="text"
                          className="form-control form-group"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          className="form-control form-group"
                          placeholder="Email"
                        />
                        <textarea
                          className="form-control form-group"
                          placeholder="Message"
                        ></textarea>
                        <button className="contact_form_submit">Send</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                      <div className="socil_item_inner d-flex">
                        <li>
                          <a href="/">
                            <i className="fab fa-facebook-square"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-headset"></i>
                    <span>+91 12345 67891</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-envelope-open-text"></i>
                    <span>info@iitbhu.ac.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="map_inner ">
                <h4>Find Us on Google Map</h4>
                <p>
                  You Can Meet Us At IIT(BHU), Varanasi in UttarPradesh India
                </p>
                <div className="map_bind">
                  <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d580973.055044202!2d82.91193628561062!3d25.335649087201603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399e3a5f9643ae23%3A0x1f2c967f8bea100!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1596988408134!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    allowFullScreen={true}
                    aria-hidden="false"
                    tabIndex={0}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
