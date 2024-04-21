import { useState } from "react";
import "./SignIn.css"; 

export const SignInForm = () => {
  const [formType, setFormType] = useState("login");

  const handleSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormType(event.target.id);
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${formType === "login" ? "login" : ""}`}>Login Form</div>
        <div className={`title ${formType === "signup" ? "signup" : ""}`}>Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={formType === "login"}
            onChange={(e) => handleSlide(e)}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={formType === "signup"}
            onChange={(e) => handleSlide(e)}
          />
          <label htmlFor="login" className={`slide login ${formType === "login" ? "active" : ""}`}>
            Login
          </label>
          <label
            htmlFor="signup"
            className={`slide signup ${formType === "signup" ? "active" : ""}`}
          >
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form action="#" className={`login ${formType === "login" ? "active" : ""}`}>
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member? <a href="">Signup now</a>
            </div>
          </form>
          <form action="#" className={`signup ${formType === "signup" ? "active" : ""}`}>
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Confirm password" required />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

