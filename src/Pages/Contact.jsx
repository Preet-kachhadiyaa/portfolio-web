import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';
import emailjs from "@emailjs/browser"; // You'll need to install this: npm install @emailjs/browser

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null },
    });

    // Important: There are two ways to specify recipient in EmailJS
    // 1. Directly in your EmailJS template as a fixed recipient
    // 2. Through the service settings in EmailJS dashboard

    emailjs
      .sendForm(
        "service_aofbh8r", // Create a service on EmailJS
        "template_sqpc3wm", // Create an email template on EmailJS
        form.current, // Using the form reference directly
        "DI9dM14PSlf3R7_ah" // Your EmailJS public key
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Message sent successfully!" },
        });

        // Reset form after successful submission
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Email error:", error);
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: `An error occurred: ${error.text}` },
        });
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="contact-container">
      <div className="contact-inner">
        <div className="contact-left">
          <motion.div
            className="contact-info"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="contact-heading">
              <span className="highlight"> Contact Me</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="contact-desc">
              I'm eager to collaborate and bring your ideas to life. Let's
              connect and explore how we can achieve your goals together!
            </motion.p>

            <motion.div variants={itemVariants} className="office-info">
              <h3>Main Office</h3>
              <div className="office-address">
                <div className="icon-wrapper">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <p>B-2,307, Golden City, Mota Varachha, Surat.</p>
              </div>

              <div className="contact-link">
                <div className="icon-wrapper">
                  <i className="fas fa-envelope"></i>
                </div>
                <a href="mailto:preetk02700270@gmail.com">
                Preetk02700270@gmail.com
                </a>
              </div>

              <div className="contact-link">
                <div className="icon-wrapper">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <a href="tel:+916351581680">+91 63515 81680</a>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="social-links">
              <h3>Follow Me</h3>
              <div className="social-icons">
                <a href="https://github.com/Preet-kachhadiyaa" target="_blank" className="social-icon">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/preet-k-320b97287/" target="_blank" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://wa.me/+916351581680" target="_blank" className="social-icon">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="contact-right">
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            className="contact-form"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="form-heading">
              Get In Touch
            </motion.h2>

            {status.info.msg && (
              <motion.div
                className={`form-status ${
                  status.info.error ? "error" : "success"
                }`}
                variants={itemVariants}
              >
                {status.info.msg}
              </motion.div>
            )}

            {/* Hidden field for recipient email - this is important! */}
            <input type="hidden" name="to_email" value="preetk02700270@gmail.com" />

            <div className="form-row">
              <motion.div variants={itemVariants} className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="fullname" // Make sure field names match your EmailJS template variables
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Preet Kachhadiya"
                    required
                  />
                  <span className="input-icon">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email" // Make sure field names match your EmailJS template variables
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Preetk02700270@gmail.com"
                    required
                  />
                  <span className="input-icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="form-row">
              <motion.div variants={itemVariants} className="form-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    name="phone" // Make sure field names match your EmailJS template variables
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="91 63515 81680"
                    required
                  />
                  <span className="input-icon">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="form-group">
                <label>Subject</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="subject" // Make sure field names match your EmailJS template variables
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                  />
                  <span className="input-icon">
                    <i className="fas fa-font"></i>
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="form-group">
              <label>Message</label>
              <textarea
                name="message" // Make sure field names match your EmailJS template variables
                value={formData.message}
                onChange={handleChange}
                placeholder="write message"
                required
              ></textarea>
            </motion.div>

            <motion.div variants={itemVariants} className="form-submit">
              <button
                type="submit"
                className="contact-btn"
                disabled={status.submitting}
              >
                {status.submitting ? "Sending..." : "Send Me Message"}
                {!status.submitting && <i className="fas fa-chevron-right"></i>}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
