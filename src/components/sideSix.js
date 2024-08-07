import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import linkedinLogo from '../assets/Logos/linkedin-logo.png'; // Update the path as needed
import githubLogo from '../assets/Logos/githubLogo.png'; // Update the path as needed

const SideSix = () => {
  const [state, handleSubmit] = useForm("xkndyvnb");

  if (state.succeeded) {
    return (
      <section id="contact" className="cubeFace contactMain success">
        <div className="container">
          <p>
            Thank you for contacting us! <br /> We will get back to you as soon as possible.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="cubeFace contactMain">
      <div className="container">
        <h2 className="container__h2">Contact Me</h2>
        <p>Feel free to reach out with any questions or comments.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          <button type="submit" disabled={state.submitting}>
            Send
          </button>
        </form>
        <footer className="contact-footer">
          <p>Connect with me:</p>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/zain-frayha" target="_blank" rel="noopener noreferrer">
                <img src={linkedinLogo} alt="LinkedIn" />
              </a>
            </li>
            <li>
              <a href="https://github.com/zain9191" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="GitHub" />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  );
};

export default SideSix;
