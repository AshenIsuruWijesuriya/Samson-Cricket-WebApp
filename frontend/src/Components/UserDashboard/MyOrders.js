import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './MyOrder.css';
import { FaDownload } from 'react-icons/fa';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const api = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.id;

                fetch(`${api}/api/order/user-orders/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch orders');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setOrders(data);
                    })
                    .catch((error) => {
                        console.error('Error fetching orders:', error);
                    });
            } catch (error) {
                console.error('Error decoding token or fetching orders:', error);
            }
        }
    }, [api]);

    const handleDownloadInvoice = (orderId) => {
        const token = localStorage.getItem('token');
        if (token) {
            window.open(`${api}/api/order/invoice/${orderId}`, '_blank', `Authorization=Bearer ${token}`);
            console.log(`Downloading invoice for order: ${orderId}`);
            // In a real application, you might trigger a download directly using a library
            // or by setting appropriate headers on the backend.
            // For a simple example, we're opening a new tab with the invoice URL.
        } else {
            console.error('No token found, cannot download invoice.');
        }
    };

    return (
        <div>
            <div className="order-container">
                <h2>Your Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Total Amount</th>
                                <th>Delivery Address</th>
                                <th>Phone Number</th>
                                <th>Order Date & Time</th>
                                <th>Order Status</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <ul>
                                            {order.items.map((item) => (
                                                <li key={item.productId?._id}>
                                                    {item.productId && (
                                                        <>
                                                            Product: {item.productId.brand} {item.productId.model}
                                                            <br />
                                                        </>
                                                    )}
                                                    Quantity: {item.quantity}
                                                    <br />
                                                    Price: LKR {item.price.toFixed(2)}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>LKR {order.totalAmount.toFixed(2)}</td>
                                    <td>{order.deliveryAddress}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>
                                        <button className="invoice-button" onClick={() => handleDownloadInvoice(order._id)}>
                                            <FaDownload />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MyOrder;