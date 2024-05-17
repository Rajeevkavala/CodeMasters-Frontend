import React from 'react';
import { motion } from 'framer-motion';

const handleSubmit = (event) => {
  event.preventDefault();
};

export const Contact = () => {
  return (
    <React.Fragment>
      <motion.div
        className="section-contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h2 className="section-common-heading">Contact Us</h2>
          <p className="section-common-subheading">
            Get in touch with us. We are always here to help you.
          </p>
        </div>

        <div className="container grid grid-two--cols">
          <div className="contact-content">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-two--cols mb-3">
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    autoComplete="off"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    required
                    placeholder="abc@gmail.com"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Your main title"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <div>
                <button type="submit" className="btn btn-submit">
                  Send message
                </button>
              </div>
            </form>
          </div>

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.8449774312717!2d78.44128907471428!3d17.562565897735805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8ff8652b6823%3A0x981713dbb4b708c3!2sMalla%20Reddy%20University!5e0!3m2!1sen!2sin!4v1701269839361!5m2!1sen!2sin"
              width="100%"
              height="500px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              alt="Google Maps"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};
