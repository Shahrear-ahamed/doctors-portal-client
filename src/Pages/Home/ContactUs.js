import React from "react";
import appoinment from "../../assets/images/appointment.png";

const ContactUs = () => {
  return (
    <section className="mt-10" style={{ background: `url(${appoinment})` }}>
      <div className="max-w-[550px] mx-auto text-center space-y-2 py-10">
        <h3 className="text-secondary text-lg font-bold">Appoinment</h3>
        <h2 className="text-3xl font-semibold text-white">
          Make an appointment Today
        </h2>
        <form className="pt-5 space-y-4 text-center">
          <input
            type="email"
            name="email"
            id="emailInput"
            placeholder="Email Address"
            className="contact-us"
            required
          />
          <br />
          <input
            type="text"
            name="subject"
            id="subjectInput"
            placeholder="Subject"
            className="contact-us"
            required
          />
          <br />
          <textarea
            name="message"
            id="messageInput"
            className="contact-us resize-none"
            cols="30"
            rows="7"
            placeholder="Your message"
          ></textarea>
          <br />
          <input className="btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
