import React, { useEffect, useState } from "react";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Retrieve the cart data from sessionStorage
    const storedCart = JSON.parse(sessionStorage.getItem("VesLakshna")) || [];
    setCartItems(storedCart); // Set the cart data to the state
  }, []);

  // Function to update the quantity
  const updateQuantity = (operation, index) => {
    const newCartItems = [...cartItems];
    if (operation === "increment") {
      newCartItems[index].quantity += 1;
    } else if (operation === "decrement" && newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
    }
    setCartItems(newCartItems);
    sessionStorage.setItem("VesLakshna", JSON.stringify(newCartItems)); // Update sessionStorage
  };

  // Function to delete an item from the cart
  const deleteItem = (productId) => {
    const newCartItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(newCartItems);
    sessionStorage.setItem("VesLakshna", JSON.stringify(newCartItems)); // Update sessionStorage after deletion
  };

  // Calculate total price for each product
  const getTotalPrice = (price, quantity) => (price * quantity).toFixed(2);

  // Calculate grand total
  const getGrandTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Your Items</title>
        <meta name="description" content="View and manage items in your shopping cart." />
        <meta name="keywords" content="shopping cart, e-commerce, checkout, products" />
      </Helmet>
      <section className="minibreadCrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link to="/product/product-details" className="back-icon text-decoration-none text-black d-flex align-items-center gap-2">
                <i className="bi bi-arrow-left text-black"></i> Back to category
              </Link>
            </div>
            <div className="col-md-6">
              <div className="text-black d-flex justify-content-end gap-2">
                <Link className="text-black" to="/">
                  <i className="bi bi-house"></i>
                </Link>
                /
                <Link className="text-black" to="#">
                  Shopping Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cart">
        <div className="container">
          <h2>Shopping Cart</h2>
          <div className="table-responsive">
            <table className="table table-bordered" style={{ borderColor: "var(--themeColor)" }}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Weight</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <tr key={item.productId}>
                      <td className="text-center">
                        <img src={item.productImage} alt="Product" width="100" />
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.weight}</td>
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm mx-1"
                          onClick={() => updateQuantity("decrement", index)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-outline-primary btn-sm mx-1"
                          onClick={() => updateQuantity("increment", index)}
                        >
                          +
                        </button>
                      </td>
                      <td>&#8377;{item.price}</td>
                      <td>&#8377;{getTotalPrice(item.price, item.quantity)}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteItem(item.productId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Your cart is empty.
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan="6" className="text-end">
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>&#8377;{getGrandTotal()}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between">
            <button onClick={() => navigate("/")} className="add-to-cart">
              Continue Shopping
            </button> &nbsp;
            <button onClick={() => navigate("/product/product-details/cart/checkout")} className="add-to-cart">
              Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;