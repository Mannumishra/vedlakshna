import React, { useState } from "react";
import "./header.css";
import logo from "../../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const searchbarToggle = () => {
    setSearch(!search);
  };

  const loginValue = sessionStorage.getItem("Login");
  return (
    <>
      {/* Top Header Section */}
      <section className="headerTop">
        <div className="container">
          <div className="row desktopHeaderTop align-items-center">
            <div className="col-md-3">
              <div className="top-header-main">
                <ul className="list-unstyled d-flex gap-3">
                  <li>
                    <Link to="/about-us" aria-label="About">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" aria-label="Contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <marquee
                behavior="smooth"
                style={{ color: "var(--themeColor)" }}
                direction=""
              >
                श्री गोधाम महातीर्थ पथमेड़ा गोशाला का अधिकृत ऑनलाइन स्टोर
                (पथमेड़ा गोशाला के गौ उत्पाद केवल वेदलक्षणा ब्रांड नाम से ही
                उपलब्ध हैं। अन्य किसी नाम से गोशाला का संबंध नहीं है।)
              </marquee>
            </div>
            <div className="col-md-3 text-end">
              <div className="top-header-search">
                <p onClick={searchbarToggle} style={{ cursor: "pointer" }}>
                  <i className="bi bi-search" aria-hidden="true"></i> Search
                </p>
                {loginValue ? (
                  <button
                    onClick={() => navigate("/profile")}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-person" aria-hidden="true"></i> Profile
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/register")}
                    className="btn btn-primary"
                  >
                    <i className="bi bi-person" aria-hidden="true"></i> Register
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Responsive Top Header */}
          <div className="row responsiveHeaderTop">
            <div className="col-8 p-0">
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
            <div className="col-4 p-0 text-end">
              <div className="top-header-search">
                <button className="btn btn-primary">
                  <i className="bi bi-person" aria-hidden="true"></i> Register
                </button>
              </div>
            </div>
          </div>

          {search ? (
            <div className="global-search">
              <input
                type="search"
                placeholder="Search Products..."
                name="search-global"
                id=""
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="row align-items-center header-row">
            <div className="col-md-2 col-6">
              <Link to={"/"}>
                <img
                  style={{ objectFit: "cover" }}
                  src={logo}
                  className="logo"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <nav className="header-main">
                <ul className="d-flex list-unstyled gap-3">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/all-products">Our Products</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-4 col-6 text-end">
              {/* Toggle Sidebar Button */}
              <div>

              <Link className="d-md-none toggleButton" to={"/cart"}>
              <i className="bi bi-cart"></i>
              </Link>
              <button
                className="d-md-none toggleButton"
                onClick={toggleSidebar}
                aria-label="Toggle Navigation"
                >
                <i className="bi bi-list"></i>
              </button>
              
                </div>
              <div className="header-card-option d-none d-md-flex">
                <div>
                  <p className="mb-0">Call and make an appointment</p>
                  <h3>
                    <Link
                      style={{
                        color: "var(--themeColor)",
                        textDecoration: "none",
                      }}
                      to="tel:+91 9873745454"
                      aria-label="Call us"
                    >
                      +91 9873745454
                    </Link>
                  </h3>
                </div>
                <button
                  onClick={() => navigate("/cart")}
                  className="btn btn-success"
                  aria-label="View Cart"
                >
                  <i className="bi bi-cart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        aria-hidden={!sidebarOpen}
      >
        <div className="sidebarCloseBtn">
          <button
            className="close-btn"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            &times;
          </button>
        </div>
        <ul className="list-unstyled">
          <li onClick={toggleSidebar}>
            <Link to="/"><i class="bi bi-house"></i> Home</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/about-us"><i class="bi bi-info-circle"></i> About Us</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/contact-us"><i class="bi bi-person-lines-fill"></i> Contact Us</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/all-products"><i class="bi bi-diagram-2"></i> Products</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/cart"><i class="bi bi-cart3"></i> Cart</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/register"><i class="bi bi-box-arrow-in-right"></i> Register</Link>
          </li>
          <li onClick={toggleSidebar}>
            <Link to="/login"><i class="bi bi-door-open"></i> Login</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Header;
