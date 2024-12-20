import React, { useEffect, useState } from "react";
import "./checkout.css";
import check from "../../images/check.gif";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Fetch cart data (this can be from sessionStorage, API, or Redux state)
    const savedCartItems = JSON.parse(sessionStorage.getItem("VesLakshna")) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleConfirmOrder = (event) => {
    event.preventDefault();

    // Process the order and then remove items from the cart
    sessionStorage.removeItem("VesLakshna"); // Clear the cart data from sessionStorage or state

    // Show popup when the order is confirmed
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    navigate("/"); // Redirect to home page or a confirmation page
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Secure Your Order Now</title>
        <meta
          name="description"
          content="Complete your checkout process securely and efficiently. Enter shipping details, review your order summary, and confirm your order."
        />
        <meta
          name="keywords"
          content="checkout, order summary, shipping details, secure payment, online store"
        />
      </Helmet>
      <section className="minibreadCrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <a
                to="/product/product-details"
                className="back-icon text-decoration-none text-black d-flex align-items-center gap-2"
              >
                <i className="bi bi-arrow-left text-black"></i> Back to category
              </a>
            </div>
            <div className="col-md-6">
              <div className="text-black d-flex justify-content-end gap-2">
                <a className="text-black" to="/">
                  <i className="bi bi-house"></i>
                </a>
                /
                <a className="text-black" to="/product/product-details/cart">
                  Shopping Cart
                </a>
                /
                <a className="text-black" to="#">
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="checkout">
        <div className="checkout-section container">
          <h1 className="mb-3">
            <b>Checkout</b>
          </h1>
          <div className="row">
            <div className="col-md-7">
              <div className="shipping-address">
                <h5>Shipping Address</h5>
                <hr />
                <form>
                  {/* Add your shipping form fields here */}
                </form>
              </div>
            </div>
            <div className="col-md-5">
              <div className="order-summary">
                <h5>Order Summary</h5>
                <hr />
                <form onSubmit={handleConfirmOrder}>
                  {/* Shipping Method and Payment Method selectors */}

                  <div className="order-product">
                    <h4>Products in Your Cart</h4>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <td><img src={item.productImage} alt="" height={50} /></td>
                            <td>{item.productName}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="order-totals">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Sub-Total</td>
                          <td>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button type="submit" className="add-to-cart">
                    Confirm Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={check} alt="success" />
            <h2>Your order has been placed!</h2>
            <p>Your order has been successfully processed!</p>
            <p>
              Please direct any questions you have to the{" "}
              <a style={{ color: "var(--themeColor)" }} href="/contact-us">
                store owner.
              </a>
            </p>
            <button onClick={handleClosePopup} className="add-to-cart">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
