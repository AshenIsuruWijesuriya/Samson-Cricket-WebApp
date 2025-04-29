import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader/AdminHeader";
import "./ManageOrders.css";
import { FaTrash, FaEdit, FaSort, FaDownload } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateOrderModal from "../../../Components/Admin/ManageOrders/UpdateOrderModel";
import * as XLSX from 'xlsx'; // Import the xlsx library

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isUpdatingModalOpen, setIsUpdatingModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [sortByDate, setSortByDate] = useState("desc");
    const api = process.env.REACT_APP_BASE_URL;

    const fetchOrders = useCallback(async () => {
        try {
            const response = await axios.get(`${api}/api/order`);
            setOrders(response.data);
            setFilteredOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }, [api]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        let results = [...orders];

        // Filter by search term
        if (searchTerm) {
            results = results.filter((order) => {
                const searchString = `${order._id} ${order.firstName} ${order.lastName} ${order.email} ${order.deliveryAddress} ${order.phoneNumber} ${order.paymentMethod} ${order.orderStatus}`.toLowerCase();
                return searchString.includes(searchTerm.toLowerCase());
            });
        }

        // Filter by status
        if (selectedStatus !== "all") {
            results = results.filter((order) => order.orderStatus === selectedStatus);
        }

        // Sort by date
        results.sort((a, b) => {
            const dateA = new Date(a.orderDate);
            const dateB = new Date(b.orderDate);
            return sortByDate === "desc" ? dateB - dateA : dateA - dateB;
        });

        setFilteredOrders(results);
    }, [searchTerm, orders, selectedStatus, sortByDate]);

    const handleDeleteOrder = async (orderId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${api}/api/order/${orderId}`);
                    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
                    Swal.fire("Deleted!", "Order has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting order:", error);
                    Swal.fire("Error!", "Failed to delete order.", "error");
                }
            }
        });
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsUpdatingModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdatingModalOpen(false);
        setSelectedOrder(null);
    };

    const handleOrderUpdated = () => {
        fetchOrders();
    };

    const toggleSortByDate = () => {
        setSortByDate(sortByDate === "desc" ? "asc" : "desc");
    };

    const downloadOrdersExcel = () => {
        const data = filteredOrders.map(order => ({
            "Order ID": order._id,
            "First Name": order.firstName,
            "Last Name": order.lastName,
            "Email": order.email,
            "Total Amount (LKR)": order.totalAmount.toFixed(2),
            "Delivery Address": order.deliveryAddress,
            "Phone Number": order.phoneNumber,
            "Payment Method": order.paymentMethod,
            "Order Status": order.orderStatus,
            "Order Date": new Date(order.orderDate).toLocaleDateString(),
        }));

        if (data.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
            XLSX.writeFile(workbook, "orders_report.xlsx");
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'No Data',
                text: 'There are no orders to download.',
            });
        }
    };


    return (
        <div className="orders-bg">
            <div className="orders-content">
                <AdminHeader />
                <div className="navigation-path-admindb">
                    <a href="/admindashboard">Admin Dashboard</a> / Manage Orders
                </div>
                <h2 className="orders-title">Manage Orders</h2>

                <div className="orders-filter-container">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="orders-search-input"
                    />
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="orders-status-filter"
                    >
                        <option value="all">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                        onClick={toggleSortByDate}
                        className="orders-sort-button"
                        title={sortByDate === "desc" ? "Sort by Oldest First" : "Sort by Newest First"}
                    >
                        <FaSort /> {sortByDate === "desc" ? "Newest First" : "Oldest First"}
                    </button>
                    <button className="download-orders-button" onClick={downloadOrdersExcel}>
                        <FaDownload className="button-icon" />
                        Download Orders Report (Excel)
                    </button>
                </div>


                {isUpdatingModalOpen && (
                    <UpdateOrderModal order={selectedOrder} onClose={handleCloseUpdateModal} onOrderUpdated={handleOrderUpdated} />
                )}

                <table className="orders-table">
                    <thead className="orders-thead">
                        <tr className="orders-tr-header">
                            <th className="orders-th">Order Details</th>
                            <th className="orders-th">First Name</th>
                            <th className="orders-th">Last Name</th>
                            <th className="orders-th">Email</th>
                            <th className="orders-th">Total Amount</th>
                            <th className="orders-th">Delivery Address</th>
                            <th className="orders-th">Phone Number</th>
                            <th className="orders-th">Payment Method</th>
                            <th className="orders-th">Order Status</th>
                            <th className="orders-th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="orders-tbody">
                        {filteredOrders.map((order) => (
                            <tr key={order._id} className="orders-tr-data">
                                <td className="order-details-td">
                                    <ul className="order-details-list">
                                        {order.items.map((item) => (
                                            <li key={item.productId?._id} className="order-details-item">
                                                {item.productId && (
                                                    <>
                                                        <span className="order-details-product">
                                                            Product: {item.productId.brand} {item.productId.model}
                                                        </span>
                                                        <br />
                                                    </>
                                                )}
                                                <span className="order-details-quantity">Quantity: {item.quantity}</span>
                                                <br />
                                                <span className="order-details-price">Price: LKR {item.price.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="orders-td">{order.firstName}</td>
                                <td className="orders-td">{order.lastName}</td>
                                <td className="orders-td">{order.email}</td>
                                <td className="orders-td">LKR {order.totalAmount.toFixed(2)}</td>
                                <td className="orders-td">{order.deliveryAddress}</td>
                                <td className="orders-td">{order.phoneNumber}</td>
                                <td className="orders-td">{order.paymentMethod}</td>
                                <td className="orders-td">{order.orderStatus}</td>
                                <td className="orders-td">
                                    <button className="orders-edit-btn" onClick={() => handleEditOrder(order)}>
                                        <FaEdit />
                                    </button>
                                    <button className="orders-delete-btn" onClick={() => handleDeleteOrder(order._id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;
