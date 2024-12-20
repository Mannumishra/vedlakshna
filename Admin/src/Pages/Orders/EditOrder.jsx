import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditOrder = () => {
    const navigate = useNavigate()
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderStatus, setOrderStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/single-order-data/${orderId}`);
                if (response.data.success) {
                    setOrder(response.data.data);
                    setOrderStatus(response.data.data.orderStatus);
                    setPaymentStatus(response.data.data.paymentStatus);
                } else {
                    toast.error('Failed to fetch order details!');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching order details!');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/update-order/${orderId}`, {
                orderStatus,
                paymentStatus,
            });
            if (response.data.success) {
                toast.success('Order updated successfully!');
                navigate("/all-orders")
                setOrder(response.data.data);
            } else {
                toast.error('Failed to update order!');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating order!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!order) {
        return <div>No order data available.</div>;
    }

    return (
        <>
            <ToastContainer />

            <div className="bread">
                <div className="head">
                    <h4>Update Order</h4>
                </div>
                <div className="links">
                    <Link to="/all-orders" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Order Details</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Order ID</th>
                                            <td>{order._id}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">User Name</th>
                                            <td>{order.shippingAddress.name}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Email</th>
                                            <td>{order.shippingAddress.email}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Phone Number</th>
                                            <td>{order.shippingAddress.phone}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Address</th>
                                            <td>
                                                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                                {order.shippingAddress.state}, {order.shippingAddress.country} -{' '}
                                                {order.shippingAddress.postalCode}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Order Date</th>
                                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Shipping</th>
                                            <td>₹{order.shippingCost}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Final Price</th>
                                            <td>₹{order.totalAmount}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Order Status</th>
                                            <td>
                                                <select
                                                    value={orderStatus}
                                                    onChange={(e) => setOrderStatus(e.target.value)}
                                                    className='form-control'
                                                    disabled={order.orderStatus === 'Delivered' || order.orderStatus === "Cancelled"}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Confirm">Confirm</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Payment Mode</th>
                                            <td>{order.paymentMethod}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Transaction Id</th>
                                            <td>{order.paymentInfo.transactionId}</td>
                                        </tr>

                                        <tr>
                                            <th scope="row">Payment Status</th>
                                            <td>
                                                <select
                                                    value={paymentStatus}
                                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                                    disabled={order.paymentStatus === 'Successfull'}
                                                    className='form-control'
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Failed">Failed</option>
                                                    <option value="Successfull">Successfull</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Items</h5>
                            </div>
                            <div className="card-body">
                                {order.products.map((product, index) => (
                                    <div className="mb-3" key={index}>
                                        <strong>{product.productName}</strong>
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            style={{ maxWidth: '100px', display: 'block', margin: '10px 0' }}
                                        />
                                        {/* <p className="mb-1">SKU: {product._id}</p> */}
                                        <p className="mb-1">Weight: {product.weight}</p>
                                        <p className="mb-1">Quantity: {product.quantity}</p>
                                        <p className="mb-0">Price: ₹{product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <button className="btn btn-primary" onClick={handleUpdate} style={{backgroundColor:"#F58634 !impotant"}}>
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditOrder;
