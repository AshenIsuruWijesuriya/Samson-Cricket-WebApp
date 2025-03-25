import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './UpdateOrderModel.css';

const api = process.env.REACT_APP_BASE_URL;

const UpdateOrderModal = ({ order, onClose, onOrderUpdated }) => {
    const [orderStatus, setOrderStatus] = useState(order.orderStatus);
    const [error, setError] = useState('');

    useEffect(() => {
        if (order) {
            setOrderStatus(order.orderStatus);
        }
    }, [order]);

    const handleUpdateOrder = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.put(`${api}/api/order/${order._id}`, {
                orderStatus: orderStatus,
            });

            Swal.fire({
                title: 'Success!',
                text: 'Order status successfully updated!',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            onOrderUpdated();
            onClose();
        } catch (error) {
            console.error('Error updating order:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');

            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'An error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="order-modal-overlay">
            <div className="order-modal-content">
                <h2 className="order-modal-title">Update Order Status</h2>
                {error && <div className="order-modal-error">{error}</div>}
                <form className="order-modal-form" onSubmit={handleUpdateOrder}>
                    <label className="order-modal-label">Order Status:</label>
                    <select
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        className="order-modal-select"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <div className="order-modal-actions">
                        <button type="submit" className="order-modal-button order-modal-button-update">
                            Update Order
                        </button>
                        <button type="button" className="order-modal-button order-modal-button-cancel" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateOrderModal;