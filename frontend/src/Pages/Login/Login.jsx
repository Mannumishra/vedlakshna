import React, { useEffect, useState } from "react";
import "./login.css";
import mail from "../../images/email-register.gif";
import password from "../../images/password.gif";
import loginImg from "../../images/signup.gif";
import confuse from "../../images/confused.gif";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const getInputData = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const res = await axios.post("http://localhost:8000/api/log-in", data);
      console.log(res)
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have Login successfully.',
        });
        sessionStorage.setItem("Login", true)
        sessionStorage.setItem("userId", res.data.data._id)
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: error.response?.data?.message || 'There was an issue with your Login. Please try again.',
      });
    }
  };
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
                <form onSubmit={postData}>
                  <div className="login-field">
                    <img src={mail} alt="Email Icon" />
                    <input
                      type="text"
                      name="email"
                      placeholder="Your Email"
                      required
                      onChange={getInputData}
                    />
                  </div>
                  <div className="login-field">
                    <img src={password} alt="Password Icon" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={getInputData}
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
