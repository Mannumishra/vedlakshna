import React, { useEffect, useState } from "react";
import "./checkout.css";
import check from "../../images/check.gif";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: ""
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const savedCartItems = JSON.parse(sessionStorage.getItem("VesLakshna")) || [];
    setCartItems(savedCartItems);
    calculateCartSummary(savedCartItems);
  }, []);

  const calculateCartSummary = (cartItems) => {
    let tempSubtotal = 0;
    cartItems.forEach(item => {
      tempSubtotal += item.price * item.quantity;
    });
    setSubtotal(tempSubtotal);
    const tempShipping = tempSubtotal < 5000 ? 150 : 0;
    setShipping(tempShipping);
    setTotal(tempSubtotal + tempShipping);
  };

  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmOrder = async (event) => {
    event.preventDefault();
    const checkoutData = {
      userId: "6762ae51f47170e1f4a1eb32",
      products: cartItems,
      shippingAddress,
      paymentMethod,
    };

    try {
      const res = await axios.post("http://localhost:8000/api/checkout", checkoutData);
      console.log(res);
      if (res.status === 201) {
        if (paymentMethod === "Online") {
          const { razorpayOrder } = res.data;
          const options = {
            key: "rzp_test_XPcfzOlm39oYi8",
            amount: razorpayOrder.amount,
            currency: "INR",
            name: "VesLakshna Store",
            description: "Checkout Payment",
            order_id: razorpayOrder.id,
            handler: async (response) => {
              const verifyResponse = await axios.post("http://localhost:8000/api/payment/verify", {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                order_id: res.data.checkout._id
              });

              if (verifyResponse.status === 200) {
                sessionStorage.removeItem("VesLakshna");
                setIsPopupVisible(true);
              } else {
                alert("Payment verification failed");
              }
            },
            prefill: {
              name: shippingAddress.name,
              email: shippingAddress.email,
              contact: shippingAddress.phone,
            },
            theme: {
              color: "#F37254", // Customize theme color
            },
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.open();
        } else {
          sessionStorage.removeItem("VesLakshna");
          setIsPopupVisible(true);
        }
      }
    } catch (error) {
      console.log("Error in order confirmation:", error);
    }
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
                  Shoping Cart
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
                {/* <form> */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input type="text" id="name" name="name" value={shippingAddress.name} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Email *</label>
                      <input type="email" id="email" name="email" value={shippingAddress.email} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input type="number" id="phone" name="phone" value={shippingAddress.phone} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="address">Address *</label>
                      <input type="text" id="address" name="address" value={shippingAddress.address} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input type="text" id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <input type="text" id="state" name="state" value={shippingAddress.state} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="country">Country *</label>
                      <input type="text" id="country" name="country" value={shippingAddress.country} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="postalCode">Postal Code</label>
                      <input type="text" id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
            <div className="col-md-5">
              <div className="order-summary">
                <h5>Order Summary</h5>
                <hr />
                {/* <form onSubmit={handleConfirmOrder}> */}
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
                          <td>&#8377;{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>&#8377;{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="order-totals">
                  <table
                    className="table table-bordered"
                    style={{ borderColor: "var(--themeColor)" }}
                  >
                    <tbody>
                      <tr>
                        <td>Sub-Total</td>
                        <td>&#8377;{subtotal}</td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td>&#8377;{shipping}</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>&#8377;{total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-group">
                  <label htmlFor="payment-method">Payment Method</label>
                  <select id="payment-method" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    {/* <option value="">-- Please Select --</option> */}
                    <option value="Online">Online</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                  </select>
                </div>
                <button type="submit" className="add-to-cart" onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={check} alt="" />
            <h2>Your order has been placed!</h2>
            <p>Your order has been successfully processed!</p>
            <p>
              Please direct any questions you have to the{" "}
              <a style={{ color: "var(--themeColor)" }} to="/contact-us">
                {" "}
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