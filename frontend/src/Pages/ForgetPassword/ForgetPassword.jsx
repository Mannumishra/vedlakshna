import React, { useEffect, useState } from "react";
import mail from "../../images/email-register.gif";
import "./forgetpassword.css";
import { Helmet } from "react-helmet";

const ForgetPassword = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      alert("OTP Verified Successfully!");
      setIsModalOpen(false);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const resendOtp = () => {
    setTimer(60);
    setOtp(Array(6).fill(""));
    alert("OTP Resent Successfully!");
  };

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <>
      <Helmet>
        <title>Forgot Password - Panchgavyamrit</title>
        <meta
          name="description"
          content="Reset your password by entering the email associated with your Panchgavyamrit account. You will receive an OTP for verification."
        />
      </Helmet>
      <section className="forget-password">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3">
              <div className="loginForm">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                    // alert(`OTP sent to ${email}`);
                  }}
                >
                  <div className="login-field">
                    <img src={mail} alt="Email Icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="login-button">
                    <button type="submit" disabled={!email}>
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-6 mb-3 text-center">
              <div className="signup">
                <h3 className="new-customer">Forgot Your Password?</h3>
                <hr />
                <p className="register-info">
                  Enter the e-mail address associated with your account. Click
                  submit to have a password reset link e-mailed to you.
                </p>
              </div>
            </div>
          </div>

          {/* OTP Modal */}
          {isModalOpen && (
            <div
              className="modal fade show"
              tabIndex="-1"
              style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">OTP Verification</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setIsModalOpen(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h1>OTP Verification</h1>
                    <p>
                      Enter the OTP sent to <span id="email">{email}</span>
                    </p>
                    <div className="otp-input">
                      {otp.map((value, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="number"
                          value={value}
                          onChange={(e) =>
                            handleOtpChange(e.target.value, index)
                          }
                          min="0"
                          max="9"
                          required
                        />
                      ))}
                    </div>
                    <div className="text-center">
                      <button className="add-to-cart" onClick={verifyOtp}>
                        Verify
                      </button>
                    </div>
                    <div className="resend-text text-center">
                      Didn't receive the code?
                      {timer > 0 ? (
                        <span id="timer">{` Resend in ${timer}s`}</span>
                      ) : (
                        <span className="resend-link" onClick={resendOtp}>
                          Resend Code
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;