import React, { useState } from "react";
import "./ContactForm.css";
import wiloLogo from "../../assets/wilo-logo.png"; // Replace with actual logo
import contactImage from "../../assets/contact-image.png"; // Replace with your image

const ContactForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    number: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Message Sent Successfully!"); // Replace with actual form submission logic
    setFormData({ companyName: "", number: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-image">
        <img src={contactImage} alt="Contact" />
        <div className="contact-text">
          <h1>Бидэнтэй холбогдох!</h1>
          <br />
          <p>We know how large objects will act, but things on a small scale</p>
          <br />
          <p>Phone :976 89558555</p>
          <p>Mail : @gmail.com</p>
        </div>
      </div>

      <div className="contact-form">
       
        <form onSubmit={handleSubmit}>
        <img src={wiloLogo} alt="Wilo Logo" className="wilo-logo" />
          <input
            type="text"
            name="companyName"
            placeholder="Байгууллагын нэр:"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="number"
            placeholder="Number:"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Mail:"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="What's your mind?"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;