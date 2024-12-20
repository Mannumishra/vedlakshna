import React, { useEffect } from "react";
import "./login.css";
import mail from "../../images/email-register.gif";
import password from "../../images/password.gif";
import loginImg from "../../images/signup.gif";
import confuse from "../../images/confused.gif";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
    <Helmet>
        <title>Login - Panchgavyamrit</title>
        <meta
          name="description"
          content="Login to your Panchgavyamrit account to access your dashboard and track your orders. If you are new, create an account to get started."
        />
      </Helmet>
    <section className="login">
      <div className="container">
        <div className="row align-items-center">
          {/* Login Form */}
          <div className="col-md-6">
            <div className="loginForm">
              <h2>
                <b>Login</b>
              </h2>
              <form>
                <div className="login-field">
                  <img src={mail} alt="Email Icon" />
                  <input
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="login-field">
                  <img src={password} alt="Password Icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="terms">
                  <input type="checkbox" name="terms" />
                  <label>I agree to all statements in Terms of Service</label>
                </div>
                <Link className="forgot-password" to="/login/forget-password">
                  <img src={confuse} alt="" />
                   Forget Password</Link>
                <div className="login-button">
                  <button type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>

          {/* Register Info */}
          <div className="col-md-6 register_responsive text-center">
            <div className="signup">
              <h3 className="new-customer">New Customer</h3>
              <hr />
              <p className="register-heading">Register Account</p>
              <p className="register-info">
                By creating an account, you will be able to shop faster, stay up
                to date on order statuses, and keep track of previous orders.
              </p>
              <img src={loginImg} alt="Login Illustration" />
              <div className="register-button">
                <Link to="/register">Continue To Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Login;
