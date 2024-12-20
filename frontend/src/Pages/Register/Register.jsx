import React, { useEffect } from "react";
import "./register.css";
import men from "../../images/men.gif";
import mail from "../../images/email-register.gif";
import password from "../../images/password.gif";
import repeatPassword from "../../images/repeat-password.gif";
import signup from "../../images/signup.gif";
import login from "../../images/login.gif";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Register = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Register - Create an Account</title>
        <meta
          name="description"
          content="Sign up to create an account and access all the features. Enter your details and join our platform to start exploring."
        />
      </Helmet>
      <section className="register">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="registerForm">
                <h2>
                  <b>Sign Up</b>
                </h2>
                <form action="">
                  <div className="register-field">
                    <img src={men} alt="Name Icon" />
                    <input type="text" name="name" placeholder="Your Name" />
                  </div>
                  <div className="register-field">
                    <img src={mail} alt="Email Icon" />
                    <input type="text" name="email" placeholder="Your Email" />
                  </div>
                  <div className="register-field">
                    <img src={password} alt="Password Icon" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="register-field">
                    <img src={repeatPassword} alt="Repeat Password Icon" />
                    <input
                      type="password"
                      name="repeat-password"
                      placeholder="Repeat Password"
                    />
                  </div>
                  <div className="terms">
                    <input type="checkbox" name="terms" />
                    <label>I agree to all statements in Terms of service</label>
                  </div>
                  <div className="register-button">
                    <button type="submit">Register</button>
                  </div>
                </form>
                <div className="already-login">
                  <img src={login} alt="Login Icon" />
                  <p>
                    <Link to="/login">I am already a member</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 register_responsive text-center">
              <div className="signup">
                <h3 className="new-customer">Login Account</h3>
                <hr />
                <p className="register-info">
                  If you already have an account with us, please login at the
                  login page.
                </p>
                <img src={signup} alt="signup Illustration" />
                <div className="register-button">
                  <Link to="/login">Continue To Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
