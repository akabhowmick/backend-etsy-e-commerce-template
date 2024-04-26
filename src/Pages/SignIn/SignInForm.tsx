import { useEffect, useRef, useState } from "react";
import "./SignIn.css";
import { ValidLogin } from "../../Types/interfaces";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  email: "",
  password: "",
  confirmPassword: "",
  match: false,
  charNumberValid: false,
  specialCharValid: false,
  uppercaseValid: false,
  numberValid: false,
};

export const SignInForm = () => {
  const { signUpUser, signInUser } = useAuthContext();
  const navigate = useNavigate();

  //!  we need to make the user's saved info appear
  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("we have a user");
      navigate("/account");
    }
  }, [navigate]);

  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState<ValidLogin>(initialFormState);

  const checkPasswordLength = (password: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      charNumberValid: password.length >= 8,
    }));
  };

  const checkSpecialCharacters = (password: string) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialCharValid: pattern.test(password),
    }));
  };

  const checkUppercase = (password: string) => {
    const pattern = /[A-Z]/;
    setFormData((prevFormData) => ({
      ...prevFormData,
      uppercaseValid: pattern.test(password),
    }));
  };

  const checkNumber = (password: string) => {
    const pattern = /[0-9]/;
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberValid: pattern.test(password),
    }));
  };

  const passwordValidations = [
    { value: formData.charNumberValid, message: "Contains 8-20 characters" },
    { value: formData.specialCharValid, message: "Contains 1 special character" },
    { value: formData.uppercaseValid, message: "Contains 1 uppercase character" },
    { value: formData.numberValid, message: "Contains 1 number" },
    { value: formData.match, message: "Passwords must match" },
  ];

  const validations = (
    <div className="validation">
      {passwordValidations.map((passwordValidation) => {
        return (
          <div className="validator" key={passwordValidation.message}>
            {passwordValidation.value ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon color="error" />
            )}
            <p className="validation-item">{passwordValidation.message}</p>
          </div>
        );
      })}
    </div>
  );

  const usernameRef = useRef<HTMLInputElement | null>(null);

  const handleSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormType(event.target.id);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: event.target.value,
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      password,
    }));
    checkPasswordLength(password);
    checkSpecialCharacters(password);
    checkUppercase(password);
    checkNumber(password);
  };

  const comparePassword = () => {
    const { password, confirmPassword } = formData;
    setFormData({
      ...formData,
      match: password === confirmPassword,
    });
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      confirmPassword,
      match: false,
    }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();
    const user = { email: formData.email, password: formData.password };
    if (formType === "login") {
      signInUser(user);
    } else {
      signUpUser(user);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    usernameRef.current?.focus();
  };

  const renderForm = (type: string) => (
    <form action="#" className={`${type}`}>
      <div className="field">
        <input
          type="text"
          placeholder="Email Address"
          ref={usernameRef}
          value={formData.email}
          onChange={(e) => handleEmailChange(e)}
          required
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handlePasswordChange(e)}
          required
        />
      </div>
      {type === "signup" && (
        <>
          <div className="field">
            <input
              type="password"
              placeholder="Confirm password"
              required
              className={`input${formData.match === false ? "--error" : ""}`}
              value={formData.confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e)}
              onBlur={comparePassword}
            />
          </div>
          {validations}
        </>
      )}
      <div className="field btn">
        <div className="btn-layer"></div>
        <input
          type="submit"
          value={type === "login" ? "Login" : "Signup"}
          onClick={(e) => handleSubmit(e)}
        />
        <button className="button--secondary" onClick={resetForm}>
          Reset
        </button>
      </div>
      {type === "signup" && (
        <div className="signup-link" onClick={() => setFormType("login")}>
          Already a member? Login now
        </div>
      )}
      {type === "login" && (
        <div className="signup-link" onClick={() => setFormType("signup")}>
          Not a member? Signup now
        </div>
      )}
    </form>
  );

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className="title">{formType === "login" ? "Login Form" : "Signup Form"}</div>
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
        <div className="form-inner">{renderForm(formType)}</div>
      </div>
    </div>
  );
};
