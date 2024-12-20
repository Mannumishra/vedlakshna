import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import image from '../../images/footer1.jpg'
const Profile = () => {
  return (
    <>
      <section className="minibreadCrumb">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/product/product-details"
                className="back-icon text-decoration-none text-black d-flex align-items-center gap-2"
              >
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
                  Your Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container profile">
        <h1>Our Profile</h1>
        <div className="d-flex justify-content-center">
          <div className="prifileContent">
            <p>
              <b style={{ color: "var(--themeColor)" }}>Name</b> : Gourav
              Panchal
            </p>
            <p>
              <b style={{ color: "var(--themeColor)" }}>Email</b> :
              Gouravpanchal80107@gmail.com
            </p>
          </div>
        </div>

        {/* ----Order History---- */}
        {/* <div className="orderHistory">
          <h2>Order History</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>101</td>
                <td>2024-11-20</td>
                <td>Wireless Mouse</td>
                <td>2</td>
                <td>$40</td>
                <td>Delivered</td>
              </tr>
              <tr>
                <td>102</td>
                <td>2024-11-22</td>
                <td>Bluetooth Speaker</td>
                <td>1</td>
                <td>$60</td>
                <td>Shipped</td>
              </tr>
              <tr>
                <td>103</td>
                <td>2024-11-23</td>
                <td>Gaming Keyboard</td>
                <td>1</td>
                <td>$80</td>
                <td>Processing</td>
              </tr>
            </tbody>
          </table>
        </div> */}

        <div className="oderHistory">
          <div className="row">
            {/* Order Details Section (4 Columns) */}
            <div className="col-md-4">
              <h4 className="mb-3">Order Details</h4>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Order ID</strong>
                    </td>
                    <td>675ecc36835cb6966697c355</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Order Status</strong>
                    </td>
                    <td>Order is Placed</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Payment Mode</strong>
                    </td>
                    <td>NetBanking</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Payment Status</strong>
                    </td>
                    <td>Created</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>₹219.5</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date</strong>
                    </td>
                    <td>15/12/2024</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Product Details Table (8 Columns) */}
            <div className="col-md-8">
              <h4 className="mb-3">Product Details</h4>
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Pic</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={image}
                        alt="Product 1"
                        className="img-thumbnail"
                      />
                    </td>
                    <td>GESPUNAH Womens, Ladies, Kids handkerchief</td>
                    <td>Free</td>
                    <td>₹99.5</td>
                    <td>1</td>
                    <td>₹99.5</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={image}
                        alt="Product 2"
                        className="img-thumbnail"
                      />
                    </td>
                    <td>GESPUNAH premium pain loafer socks pack of 5</td>
                    <td>One size</td>
                    <td>₹120</td>
                    <td>1</td>
                    <td>₹120</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ----Order History---- end */}
      </div>
    </>
  );
};

export default Profile;
